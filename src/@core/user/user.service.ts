import { Injectable } from '@nestjs/common';

import { CreateUserDto } from './dto/create-user.dto';
import { CreateUserUseCase } from './use-case/create-user.use-case';
import { GetUserByEmailUseCase } from './use-case/get-user-by-email.use-case';
import { GetUserModelView } from './model-view/get-user.mv';

@Injectable()
export class UserService {
  constructor(
    private readonly createUserUseCase: CreateUserUseCase,
    private readonly getUserByEmailUseCase: GetUserByEmailUseCase,
  ) {}

  async createUser(dto: CreateUserDto): Promise<GetUserModelView> {
    const response = await this.createUserUseCase.execute(dto);

    if (!response) {
      throw new Error('Cannot create user');
    }

    return response;
  }

  async getByEmail(email: string): Promise<GetUserModelView> {
    const response = this.getUserByEmailUseCase.execute(email);

    if (!response) {
      throw new Error('Cannot find user with this e-mail');
    }

    return response;
  }
}
