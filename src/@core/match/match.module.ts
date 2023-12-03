import { Module } from '@nestjs/common';
import { MatchService } from './match.service';
import { MatchController } from './match.controller';
import { NotificationModule } from '../notification/notification.module';
import { UserModule } from '../user/user.module';
import { InterestingRelationRepository } from '../infra/db/repositories/interesting-relation/interesting-relation.repository';
import { InterestingRelationRepositoryKey } from '../interfaces/interesting-relation/interesting-relation.interface';
import { GetInterestUseCase } from './use-case/get-interest.use-case';
import { CreateInterestUseCase } from './use-case/create-interest.use-case';
import { MongooseModule } from '@nestjs/mongoose';
import {
  InterestingRelation,
  InterestingRelationSchema,
} from '../infra/db/schema/interesting-relation.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: InterestingRelation.name, schema: InterestingRelationSchema },
    ]),
    NotificationModule,
    UserModule,
  ],
  controllers: [MatchController],
  providers: [
    MatchService,
    GetInterestUseCase,
    CreateInterestUseCase,
    {
      useClass: InterestingRelationRepository,
      provide: InterestingRelationRepositoryKey,
    },
  ],
})
export class MatchModule {}
