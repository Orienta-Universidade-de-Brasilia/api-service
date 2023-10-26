import {
  IUserRepository,
  UserRepositoryKey,
} from '@app/@core/interfaces/user/user.interface';
import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { randomBytes } from 'crypto';

@Injectable()
export class GenerateCodeUseCase {
  constructor(
    @Inject(UserRepositoryKey)
    private readonly userRepository: IUserRepository,
  ) {}

  async execute(email: string) {
    const code = randomBytes(3).toString('hex');
    const [response, user] = await Promise.all([
      this.userRepository.saveCodeGenerated(email, code),
      this.userRepository.getByEmail(email),
    ]);

    if (!user) {
      throw new BadRequestException('Cannot find user to resend confirmation');
    }

    return {
      code: response.code,
      name: `${user.firstName} ${user.lastName}`,
    };
  }
}
