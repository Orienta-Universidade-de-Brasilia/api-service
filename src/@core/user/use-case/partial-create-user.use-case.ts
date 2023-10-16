import { Inject, Injectable } from '@nestjs/common';
import { PartialCreateUserDto } from '../dto/partial-create-user.dto';
import {
  IUserRepository,
  UserRepositoryKey,
} from '@app/@core/interfaces/user/user.interface';

@Injectable()
export class PartialCreateUserUseCase {
  constructor(
    @Inject(UserRepositoryKey)
    private readonly userRepository: IUserRepository,
  ) {}

  async execute(id: string, dto: PartialCreateUserDto) {
    const response = await this.userRepository.partialCreate(id, dto);

    return response;
  }
}
