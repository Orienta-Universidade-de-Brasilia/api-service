import { Inject, Injectable } from '@nestjs/common';
import {
  IUserRepository,
  UserRepositoryKey,
} from '@interfaces/user/user.interface';
import { authModelView } from '@app/@core/user/model-view/get-user.mv';

@Injectable()
export class GetAuthByEmailUseCase {
  constructor(
    @Inject(UserRepositoryKey)
    private readonly userRepository: IUserRepository,
  ) {}

  async execute(email: string): Promise<authModelView> {
    const model = await this.userRepository.getByEmail(email);

    return model as unknown as authModelView;
  }
}
