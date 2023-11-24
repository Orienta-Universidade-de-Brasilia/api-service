import {
  IUserRepository,
  UserRepositoryKey,
} from '@app/@core/interfaces/user/user.interface';
import { BadRequestException, Inject, Injectable } from '@nestjs/common';

@Injectable()
export class ConfirmationUseCase {
  constructor(
    @Inject(UserRepositoryKey)
    private readonly userRepository: IUserRepository,
  ) {}

  async execute(email: string, code: string) {
    const user = await this.userRepository.getByEmail(email);

    if (!user) {
      throw new BadRequestException('Cannot find user to resend confirmation');
    }

    const response = await this.userRepository.getCodeByUserId(user.id);

    const confirmation = code.toLowerCase() === response.code.toLowerCase();

    if (!confirmation) {
      return;
    }

    const timeLimit = +new Date();

    if (+response.code > timeLimit) {
      throw new BadRequestException('Time limit exceed, please resend code!');
    }

    const confirmed = await this.userRepository.confirmEmailByUserId(
      user.id,
      confirmation,
    );

    return confirmed;
  }
}
