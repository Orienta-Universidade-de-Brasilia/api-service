import { BadRequestException, Injectable } from '@nestjs/common';
import { User, UserDocument } from '../../schema/user.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IUserRepository } from '@app/@core/interfaces/user/user.interface';
import { CreateUserDto } from '@app/@core/user/dto/create-user.dto';
import { PartialCreateUserDto } from '@app/@core/user/dto/partial-create-user.dto';
import { UserType, UserTypeDocument } from '../../schema/userType.schema';
import { Code, CodeDocument } from '../../schema/code.schema';
import { UserModelView } from '@app/@core/auth/model-view/user.mv';
import { PageDto, PageMetaDto, PageOptionsDto } from '@app/@core/common/dto';

@Injectable()
export class UserRepository implements IUserRepository {
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<UserDocument>,
    @InjectModel(Code.name)
    private readonly codeModel: Model<CodeDocument>,
    @InjectModel(UserType.name)
    private readonly userTypeModel: Model<UserTypeDocument>,
  ) {}
  async create(dto: CreateUserDto): Promise<User> {
    const model = new this.userModel(dto);
    return await model.save();
  }

  async getByEmail(email: string): Promise<User> {
    return await this.userModel.findOne({ email });
  }

  async getById(id: string): Promise<User> {
    return await this.userModel.findOne({ _id: id });
  }

  async createUserType(dto: string): Promise<UserType> {
    const model = new this.userTypeModel({ description: dto });
    return await model.save();
  }

  async getUserTypeByName(type: string): Promise<UserType> {
    return await this.userTypeModel.findOne({ description: type });
  }

  async partialCreate(id: string, dto: PartialCreateUserDto): Promise<number> {
    const partialCreate = await this.userModel.updateOne(
      { _id: id },
      { $set: dto },
    );

    return partialCreate.modifiedCount;
  }

  async saveCodeGenerated(email: string, code: string): Promise<Code> {
    const user = await this.getByEmail(email);

    if (!user) {
      return;
    }

    const hasCode = await this.getCodeByUserId(user.id);

    if (hasCode && +hasCode.expireIn > +new Date()) {
      throw new BadRequestException(
        'There is already a request, please try again as soon as the time expires',
      );
    }

    const model = new this.codeModel({ code, userId: user._id });
    return await model.save();
  }

  async updateCodeByUserId(userId: string, code: string): Promise<number> {
    const old = await this.codeModel.findOne({ userId: userId });

    if (!old) {
      return;
    }

    const updateData = await this.codeModel.updateOne(
      { _id: old._id },
      {
        $set: {
          code,
        },
      },
    );

    return updateData.modifiedCount;
  }

  async getCodeByUserId(userId: string): Promise<Code> {
    const response = await this.codeModel.findOne({ userId });

    return response;
  }

  async confirmEmailByUserId(
    userId: string,
    confirmation: boolean,
  ): Promise<boolean> {
    const updateData = await this.userModel.updateOne(
      { _id: userId },
      { $set: { emailConfirmed: confirmation } },
    );
    return updateData.acknowledged;
  }

  async listUsers(
    user: UserModelView,
    filters: PageOptionsDto,
  ): Promise<PageDto<User>> {
    const baseQuery = {
      _id: {
        $ne: user.id,
      },
    };

    const [itemCount, entities] = await Promise.all([
      this.userModel.countDocuments(baseQuery).exec(),
      this.userModel
        .find(baseQuery)
        .sort({ createdAt: filters.order })
        .skip(filters.skip)
        .limit(filters.take)
        .exec(),
    ]);

    const pageMetaDto = new PageMetaDto({
      itemCount,
      pageOptionsDto: filters,
    });

    return new PageDto(entities, pageMetaDto);
  }
}
