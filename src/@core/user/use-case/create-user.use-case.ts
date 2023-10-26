import { CreateUserDto } from '../dto/create-user.dto';
import { Inject, Injectable } from '@nestjs/common';
import {
  IUserRepository,
  UserRepositoryKey,
} from '../../interfaces/user/user.interface';
import { GetUserModelView } from '../model-view/get-user.mv';
import { ProfileDomain, UserType } from '../types/user.types';

@Injectable()
export class CreateUserUseCase {
  constructor(
    @Inject(UserRepositoryKey)
    private readonly userRepository: IUserRepository,
  ) {}

  async execute(dto: CreateUserDto): Promise<GetUserModelView> {
    const domain = this.checkProfileDomainByEmail(dto.email);
    const userType = await this.userRepository.getUserTypeByName(
      UserType[domain],
    );
    const payload: CreateUserDto = {
      ...dto,
      userType,
      isActive: true,
    };

    const model = await this.userRepository.create(payload);

    return model as unknown as GetUserModelView;
  }

  checkProfileDomainByEmail(email: string): string | null {
    const regex = /@([A-Za-z0-9.-]+)/;
    const match = email.match(regex);

    if (match) {
      return Object.keys(ProfileDomain).filter(
        (key) => ProfileDomain[key] === match[1],
      )[0];
    }
    return null;
  }
}
