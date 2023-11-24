import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { CreatePeriodDto } from './dto/create-period.dto';
import { UserModelView } from '../auth/model-view/user.mv';
import { UserTypeEnum } from '../user/types/user.types';
import { CreatePeriodUseCase } from './use-case/create-period.use-case';
import { GetCurrentPeriodUseCase } from './use-case/get-current-period.use-case';

@Injectable()
export class PeriodService {
  constructor(
    private readonly createPeriodUseCase: CreatePeriodUseCase,
    private readonly getCurrentPeriodUseCase: GetCurrentPeriodUseCase,
  ) {}

  async createPeriod(dto: CreatePeriodDto, user: UserModelView) {
    if (user.userType !== UserTypeEnum.ADMIN) {
      throw new UnauthorizedException(
        'You do not have permission to execute this task',
      );
    }

    const hasPeriodYet = await this.getCurrentPeriodUseCase.execute();

    if (hasPeriodYet) {
      throw new BadRequestException('There are periods enouth yet');
    }

    const response = await this.createPeriodUseCase.execute(dto, user);

    if (!response) {
      throw new BadRequestException('Can not create period, try again later');
    }

    return response;
  }

  async getCurrentPeriod() {
    const response = await this.getCurrentPeriodUseCase.execute();

    if (!response) {
      return;
    }

    return response;
  }
}
