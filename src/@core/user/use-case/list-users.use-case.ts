import { Inject, Injectable } from '@nestjs/common';
import {
  IUserRepository,
  UserRepositoryKey,
} from '@interfaces/user/user.interface';
import { GetUserModelView } from '../model-view/get-user.mv';
import { UserModelView } from '@app/@core/auth/model-view/user.mv';
import { PageDto, PageOptionsDto } from '@app/@core/common/dto';

@Injectable()
export class ListUsersUseCase {
  constructor(
    @Inject(UserRepositoryKey)
    private readonly userRepository: IUserRepository,
  ) {}

  async execute(
    user: UserModelView,
    filters: PageOptionsDto,
  ): Promise<PageDto<GetUserModelView>> {
    const models = await this.userRepository.listUsers(user, filters);

    const response = models.data.map((model) => {
      const userView = new GetUserModelView();
      userView.initialize(model);
      return userView;
    });

    return new PageDto(response, models.meta);
  }
}
