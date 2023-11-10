import { Inject, Injectable } from '@nestjs/common';
import {
  IPeriodRepository,
  PeriodRepositoryKey,
} from '@app/@core/interfaces/period/period.interface';
import { DateTimeFormat } from 'intl';

@Injectable()
export class GetCurrentPeriodUseCase {
  constructor(
    @Inject(PeriodRepositoryKey)
    private readonly periodRepository: IPeriodRepository,
  ) {}

  async execute() {
    const date = new Date();

    const reference = DateTimeFormat('pt-br').format(date).split('/');

    const period = parseInt(reference[1]) < 6 ? 1 : 2;
    const hasPeriod = await this.periodRepository.getPeriodBymonthAndYear(
      period,
      parseInt(reference[2]),
    );

    if (!hasPeriod) {
      return;
    }

    return hasPeriod;
  }
}
