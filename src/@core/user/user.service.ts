import { PageDto } from './../common/dto/page.dto';
import { BadRequestException, Injectable } from '@nestjs/common';

import { CreateUserDto } from './dto/create-user.dto';
import { CreateUserUseCase } from './use-case/create-user.use-case';
import { GetUserByEmailUseCase } from './use-case/get-user-by-email.use-case';
import { GetUserModelView } from './model-view/get-user.mv';
import { PartialCreateUserDto } from './dto/partial-create-user.dto';
import { PartialCreateUserUseCase } from './use-case/partial-create-user.use-case';
import { GetUserByIdUseCase } from './use-case/get-user-by-id.use-case';
import { CreateUserTypeDto } from './dto/create-user-type.dto';
import { GetUserTypeModelView } from './model-view/get-user-type.mv';
import { CreateUserTypeUseCase } from './use-case/create-user-type.use-case';
import { UserModelView } from '../auth/model-view/user.mv';
import { ListUsersUseCase } from './use-case/list-users.use-case';
import { PageOptionsDto } from '../common/dto';
import { GetAllUseCase } from './use-case/get-all.use-case';
import { SetRecommendationUseCase } from './use-case/set-recommendation.use-case';

@Injectable()
export class UserService {
  constructor(
    private readonly createUserUseCase: CreateUserUseCase,
    private readonly getUserByEmailUseCase: GetUserByEmailUseCase,
    private readonly getUserByIdUseCase: GetUserByIdUseCase,
    private readonly partialCreateUserUseCase: PartialCreateUserUseCase,
    private readonly createUserTypeUseCase: CreateUserTypeUseCase,
    private readonly listUsersUseCase: ListUsersUseCase,
    private readonly getAllUseCase: GetAllUseCase,
    private readonly setRecommendationUseCase: SetRecommendationUseCase,
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

  async listUsers(
    user: UserModelView,
    filters: PageOptionsDto,
  ): Promise<PageDto<GetUserModelView>> {
    const response = await this.listUsersUseCase.execute(user, filters);

    if (!response) {
      throw new BadRequestException('Cannot list users');
    }

    return response;
  }

  async createUserType(dto: CreateUserTypeDto): Promise<GetUserTypeModelView> {
    const response = await this.createUserTypeUseCase.execute(dto);

    if (!response) {
      throw new BadRequestException('Cannot create userType');
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

  async recommendUser(
    currentUser: UserModelView,
    search?: string,
  ): Promise<GetUserModelView[]> {
    const users = await this.getAllUseCase.execute(currentUser, search);

    if (!currentUser.interestedArea.length) {
      return users;
    }

    const response = await this.setRecommendationUseCase.execute(
      currentUser,
      users,
    );
    return response;
  }
}
