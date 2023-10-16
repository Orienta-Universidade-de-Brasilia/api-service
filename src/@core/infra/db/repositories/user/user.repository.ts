import { Injectable } from '@nestjs/common';
import { User, UserDocument } from '../../schema/user.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IUserRepository } from '@app/@core/interfaces/user/user.interface';
import { CreateUserDto } from '@app/@core/user/dto/create-user.dto';

@Injectable()
export class UserRepository implements IUserRepository {
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<UserDocument>,
  ) {}
  async create(dto: CreateUserDto): Promise<User> {
    const model = new this.userModel(dto);
    return await model.save();
  }

  async getByEmail(email: string): Promise<User> {
    return await this.userModel.findOne({ email });
  }
}
