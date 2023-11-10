import { Module } from '@nestjs/common';
import { PeriodController } from './period.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { PeriodService } from './period.service';
import { Period, PeriodSchema } from '../infra/db/schema/period.schema';
import { PeriodRepository } from '../infra/db/repositories/period/period.repository';
import { PeriodRepositoryKey } from '../interfaces/period/period.interface';
import { CreatePeriodUseCase } from './use-case/create-period.use-case';
import { GetCurrentPeriodUseCase } from './use-case/get-current-period.use-case';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Period.name, schema: PeriodSchema }]),
  ],
  controllers: [PeriodController],
  providers: [
    PeriodService,
    CreatePeriodUseCase,
    GetCurrentPeriodUseCase,
    {
      useClass: PeriodRepository,
      provide: PeriodRepositoryKey,
    },
  ],
  exports: [PeriodService],
})
export class PeriodModule {}
