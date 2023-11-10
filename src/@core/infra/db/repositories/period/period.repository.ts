import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Period, PeriodDocument } from '../../schema/period.schema';
import { IPeriodRepository } from '@app/@core/interfaces/period/period.interface';
import { UserModelView } from '@app/@core/auth/model-view/user.mv';

@Injectable()
export class PeriodRepository implements IPeriodRepository {
  constructor(
    @InjectModel(Period.name)
    private readonly periodModel: Model<PeriodDocument>,
  ) {}
  async create(
    year: number,
    period: number,
    user: UserModelView,
  ): Promise<Period> {
    const model = new this.periodModel({
      year,
      period,
      userId: user.id,
    });
    return await model.save();
  }

  async getPeriodBymonthAndYear(period: number, year: number): Promise<Period> {
    return await this.periodModel
      .findOne({
        year,
        period,
      })
      .lean();
  }
  async getPeriodByYear(year: number): Promise<Period[]> {
    return await this.periodModel
      .find({
        year,
      })
      .lean();
  }
}
