import { BadRequestException, Injectable } from '@nestjs/common';

import { CreateUserDto } from './dto/create-user.dto';
import { CreateUserUseCase } from './use-case/create-user.use-case';
import { GetUserByEmailUseCase } from './use-case/get-user-by-email.use-case';
import { GetUserModelView } from './model-view/get-user.mv';
import { PartialCreateUserDto } from './dto/partial-create-user.dto';
import { PartialCreateUserUseCase } from './use-case/partial-create-user.use-case';
import { GetUserByIdUseCase } from './use-case/get-user-by-id.use-case';

@Injectable()
export class UserService {
  constructor(
    private readonly createUserUseCase: CreateUserUseCase,
    private readonly getUserByEmailUseCase: GetUserByEmailUseCase,
    private readonly getUserByIdUseCase: GetUserByIdUseCase,
    private readonly partialCreateUserUseCase: PartialCreateUserUseCase,
  ) {}

  async createUser(dto: CreateUserDto): Promise<GetUserModelView> {
    const response = await this.createUserUseCase.execute(dto);

    if (!response) {
      throw new BadRequestException('Cannot create user');
    }

    return response;
  }

  async getByEmail(email: string): Promise<GetUserModelView> {
    const response = await this.getUserByEmailUseCase.execute(email);

    if (!response) {
      throw new BadRequestException('Cannot find user with this e-mail');
    }

    return response;
  }

  async getUserById(id: string): Promise<GetUserModelView> {
    const response = await this.getUserByIdUseCase.execute(id);

    if (!response) {
      throw new BadRequestException('Cannot find user with this id');
    }

    return response;
  }

  async partialCreateUser(
    id: string,
    dto: PartialCreateUserDto,
  ): Promise<GetUserModelView> {
    const response = await this.partialCreateUserUseCase.execute(id, dto);

    if (!response) {
      throw new BadRequestException('Cannot create user');
    }

    const user = await this.getUserById(id);

    return user;
  }
}
