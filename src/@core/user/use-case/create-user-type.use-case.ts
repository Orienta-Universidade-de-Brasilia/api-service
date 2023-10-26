import { Inject, Injectable } from '@nestjs/common';
import {
  IUserRepository,
  UserRepositoryKey,
} from '@interfaces/user/user.interface';
import { GetUserTypeModelView } from '../model-view/get-user-type.mv';
import { CreateUserTypeDto } from '../dto/create-user-type.dto';

@Injectable()
export class CreateUserTypeUseCase {
  constructor(
    @Inject(UserRepositoryKey)
    private readonly userRepository: IUserRepository,
  ) {}

  async execute(dto: CreateUserTypeDto): Promise<GetUserTypeModelView> {
    const description = dto.description.toUpperCase();
    const response = await this.userRepository.createUserType(description);

    return response as unknown as GetUserTypeModelView;
  }
}
