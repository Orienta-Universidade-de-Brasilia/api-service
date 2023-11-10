import {
  IUserRepository,
  UserRepositoryKey,
} from '@app/@core/interfaces/user/user.interface';
import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { randomInt } from 'crypto';

@Injectable()
export class GenerateCodeUseCase {
  constructor(
    @Inject(UserRepositoryKey)
    private readonly userRepository: IUserRepository,
  ) {}

  async execute(email: string) {
    const code = randomInt(6).toString();
    const [response, user] = await Promise.all([
      this.userRepository.saveCodeGenerated(email, code),
      this.userRepository.getByEmail(email),
    ]);

    if (!user) {
      throw new BadRequestException('Cannot find user to send confirmation');
    }

    return {
      code: response.code,
      name: `${user.firstName} ${user.lastName}`,
    };
  }
}
