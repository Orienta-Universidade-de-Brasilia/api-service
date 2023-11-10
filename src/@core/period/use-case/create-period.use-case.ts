import { Inject, Injectable } from '@nestjs/common';
import { CreatePeriodDto } from '../dto/create-period.dto';
import { UserModelView } from '@app/@core/auth/model-view/user.mv';
import {
  IPeriodRepository,
  PeriodRepositoryKey,
} from '@app/@core/interfaces/period/period.interface';
import { DateTimeFormat } from 'intl';

@Injectable()
export class CreatePeriodUseCase {
  constructor(
    @Inject(PeriodRepositoryKey)
    private readonly periodRepository: IPeriodRepository,
  ) {}

  async execute(dto: CreatePeriodDto, user: UserModelView) {
    const date = new Date(dto.year, 1, 0);
    const reference = DateTimeFormat('pt-br').format(date).split('/');

    const savePromise = [];

    const hasCurrentYear = await this.periodRepository.getPeriodByYear(
      parseInt(reference[2]),
    );

    if (!hasCurrentYear.length) {
      savePromise.push(
        this.periodRepository.create(parseInt(reference[2]), 1, user),
      );
      savePromise.push(
        this.periodRepository.create(parseInt(reference[2]), 2, user),
      );
    }

    for (let i = 1; i <= 5; i++) {
      const year = parseInt(reference[2]) + i;
      savePromise.push(this.periodRepository.create(year, 1, user));
      savePromise.push(this.periodRepository.create(year, 2, user));
    }
    const resolve = await Promise.all(savePromise);

    return resolve;
  }
}
