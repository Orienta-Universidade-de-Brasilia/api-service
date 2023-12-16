import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { UserRepositoryKey } from '@interfaces/user/user.interface';
import { UserRepository } from '@infra/db/repositories/user/user.repository';
import { MongooseModule } from '@nestjs/mongoose';
import { CreateUserUseCase } from './use-case/create-user.use-case';
import { GetUserByEmailUseCase } from './use-case/get-user-by-email.use-case';
import { GetUserByIdUseCase } from './use-case/get-user-by-id.use-case';
import { PartialCreateUserUseCase } from './use-case/partial-create-user.use-case';
import { UserFeature } from '@infra/db/imports/user';
import { CreateUserTypeUseCase } from './use-case/create-user-type.use-case';
import { ListUsersUseCase } from './use-case/list-users.use-case';
import { GetAllUseCase } from './use-case/get-all.use-case';
import { SetRecommendationUseCase } from './use-case/set-recommendation.use-case';

@Module({
  imports: [MongooseModule.forFeature(UserFeature)],
  controllers: [UserController],
  providers: [
    PartialCreateUserUseCase,
    SetRecommendationUseCase,
    GetUserByEmailUseCase,
    GetUserByIdUseCase,
    CreateUserTypeUseCase,
    CreateUserUseCase,
    ListUsersUseCase,
    GetAllUseCase,
    UserService,
    {
      useClass: UserRepository,
      provide: UserRepositoryKey,
    },
  ],
  exports: [UserService, UserRepositoryKey, GetUserByIdUseCase],
})
export class UserModule {}
