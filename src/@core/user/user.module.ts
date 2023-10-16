import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { UserRepositoryKey } from '@interfaces/user/user.interface';
import { UserRepository } from '@infra/db/repositories/user/user.repository';
import { User, UserSchema } from '../infra/db/schema/user.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { CreateUserUseCase } from './use-case/create-user.use-case';
import { GetUserByEmailUseCase } from './use-case/get-user-by-email.use-case';
import { GetUserByIdUseCase } from './use-case/get-user-by-id.use-case';
import { PartialCreateUserUseCase } from './use-case/partial-create-user.use-case';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  controllers: [UserController],
  providers: [
    PartialCreateUserUseCase,
    GetUserByEmailUseCase,
    GetUserByIdUseCase,
    CreateUserUseCase,
    UserService,
    {
      useClass: UserRepository,
      provide: UserRepositoryKey,
    },
  ],
  exports: [UserService],
})
export class UserModule {}
