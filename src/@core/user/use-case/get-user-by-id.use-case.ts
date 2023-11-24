import { Inject, Injectable } from '@nestjs/common';
import {
  IUserRepository,
  UserRepositoryKey,
} from '@interfaces/user/user.interface';
import { GetUserModelView } from '../model-view/get-user.mv';

@Injectable()
export class GetUserByIdUseCase {
  constructor(
    @Inject(UserRepositoryKey)
    private readonly userRepository: IUserRepository,
  ) {}

  async execute(id: string): Promise<GetUserModelView> {
    const response = await this.userRepository.getById(id);

    return response as unknown as GetUserModelView;
  }
}
