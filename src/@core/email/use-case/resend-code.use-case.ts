import {
  IUserRepository,
  UserRepositoryKey,
} from '@app/@core/interfaces/user/user.interface';
import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { randomBytes } from 'crypto';

@Injectable()
export class ResendCodeUseCase {
  constructor(
    @Inject(UserRepositoryKey)
    private readonly userRepository: IUserRepository,
  ) {}

  async execute(email: string) {
    const code = randomBytes(3).toString('hex');
    const user = await this.userRepository.getByEmail(email);

    if (!user) {
      throw new BadRequestException('Cannot find user to resend confirmation');
    }

    const response = await this.userRepository.updateCodeByUserId(
      user.id,
      code,
    );

    if (!response) {
      throw new BadRequestException('Cannot resend confirmation code');
    }

    return {
      code: code,
      name: `${user.firstName} ${user.lastName}`,
    };
  }
}
