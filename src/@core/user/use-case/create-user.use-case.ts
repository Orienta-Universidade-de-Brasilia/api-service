import { CreateUserDto } from '../dto/create-user.dto';
import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import {
  IUserRepository,
  UserRepositoryKey,
} from '../../interfaces/user/user.interface';
import { GetUserModelView } from '../model-view/get-user.mv';
import { ProfileDomain, UserTypeEnum } from '../types/user.types';

@Injectable()
export class CreateUserUseCase {
  constructor(
    @Inject(UserRepositoryKey)
    private readonly userRepository: IUserRepository,
  ) {}

  async execute(dto: CreateUserDto): Promise<GetUserModelView> {
    const domain = this.checkProfileDomainByEmail(dto.email);
    if (!domain) {
      throw new BadRequestException('Invalid domain - use UnB Domains only');
    }
    const exist = await this.userRepository.getByEmail(dto.email);

    if (exist) {
      throw new BadRequestException('There is an user with this email');
    }

    const userType = await this.userRepository.getUserTypeByName(
      UserTypeEnum[domain],
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
