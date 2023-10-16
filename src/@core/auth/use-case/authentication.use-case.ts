import { Injectable } from '@nestjs/common';
import { authenticationDto } from '../dto/auth.dto';
import { UserModelView } from '../mv/user.mv';

@Injectable()
export class AuthenticateUserUseCase {
  // constructor() {}
  async execute(authData: authenticationDto): Promise<UserModelView | null> {
    // const response =
    // if (!user) throw new Error('Cannot authenticate user');
    return null;
  }
}
