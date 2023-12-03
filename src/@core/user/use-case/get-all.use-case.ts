import { Inject, Injectable } from '@nestjs/common';
import {
  IUserRepository,
  UserRepositoryKey,
} from '@interfaces/user/user.interface';
import { GetUserModelView } from '../model-view/get-user.mv';
import { UserModelView } from '@app/@core/auth/model-view/user.mv';

@Injectable()
export class GetAllUseCase {
  constructor(
    @Inject(UserRepositoryKey)
    private readonly userRepository: IUserRepository,
  ) {}

  async execute(
    user: UserModelView,
    search?: string,
  ): Promise<GetUserModelView[]> {
    const models = await this.userRepository.getAllUsers(user, search);

    if (!models.length) {
      return [];
    }

    const response = models.map((model) => {
      const userView = new GetUserModelView();
      userView.initialize(model);
      return userView;
    });

    return response;
  }
}
