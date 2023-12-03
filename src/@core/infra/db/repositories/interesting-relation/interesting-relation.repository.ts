import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  InterestingRelation,
  InterestingRelationDocument,
} from '../../schema/interesting-relation.schema';
import {
  IInterestingRelationRepository,
  interestDto,
} from '@app/@core/interfaces/interesting-relation/interesting-relation.interface';
import { InterestingDto } from '@app/@core/match/dto/interesting.dto';
import { UserModelView } from '@app/@core/auth/model-view/user.mv';

@Injectable()
export class InterestingRelationRepository
  implements IInterestingRelationRepository
{
  constructor(
    @InjectModel(InterestingRelation.name)
    private readonly interestingRelationModel: Model<InterestingRelationDocument>,
  ) {}
  async create(dto: interestDto): Promise<InterestingRelation> {
    const model = new this.interestingRelationModel({
      userId: dto.userId,
      targetId: dto.targetId,
      userInterest: true,
      year: dto.year,
      period: dto.period,
    });
    return await model.save();
  }

  async updateInterest(id: string): Promise<boolean> {
    const model = await this.interestingRelationModel
      .updateOne(
        { _id: id },
        {
          targetInterest: true,
          updatedAt: new Date(),
        },
      )
      .lean();
    return model.acknowledged;
  }

  async getInterested(
    dto: InterestingDto,
    user: UserModelView,
  ): Promise<InterestingRelation> {
    const response = await this.interestingRelationModel
      .findOne({
        userId: user.id,
        targetId: dto.targetId,
        period: user.period,
        year: user.year,
      })
      .lean();

    return response;
  }

  async getByParticipantIds(dto: interestDto): Promise<InterestingRelation> {
    return await this.interestingRelationModel
      .findOne({
        ...dto,
      })
      .lean();
  }
}
