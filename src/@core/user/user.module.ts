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

@Module({
  imports: [MongooseModule.forFeature(UserFeature)],
  controllers: [UserController],
  providers: [
    PartialCreateUserUseCase,
    GetUserByEmailUseCase,
    GetUserByIdUseCase,
    CreateUserTypeUseCase,
    CreateUserUseCase,
    ListUsersUseCase,
    UserService,
    {
      useClass: UserRepository,
      provide: UserRepositoryKey,
    },
  ],
  exports: [UserService, UserRepositoryKey],
})
export class UserModule {}
