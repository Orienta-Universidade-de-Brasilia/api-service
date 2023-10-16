import { Inject, Injectable } from '@nestjs/common';
import {
  IUserRepository,
  UserRepositoryKey,
} from '@interfaces/user/user.interface';
import { GetUserModelView } from '../model-view/get-user.mv';

@Injectable()
export class GetUserByEmailUseCase {
  constructor(
    @Inject(UserRepositoryKey)
    private readonly userRepository: IUserRepository,
  ) {}

  async execute(email: string): Promise<GetUserModelView> {
    const response = await this.userRepository.getByEmail(email);

    return response as unknown as GetUserModelView;
  }
}
