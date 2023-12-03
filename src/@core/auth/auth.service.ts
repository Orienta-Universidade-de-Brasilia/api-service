import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { User } from '../infra/db/schema/user.schema';
import { Period } from '../infra/db/schema/period.schema';
import { authModelView } from '../user/model-view/get-user.mv';
import { GetAuthByEmailUseCase } from './use-case/get-auth-by-email.use-case';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly getAuthByEmailUseCase: GetAuthByEmailUseCase,
  ) {}

  async authGetByEmail(email: string): Promise<authModelView> {
    const response = await this.getAuthByEmailUseCase.execute(email);

    if (!response) {
      throw new BadRequestException('Cannot find user with this e-mail');
    }

    return response;
  }

  async login(user: User, period: Period) {
    const payload = {
      sub: user.id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      fullName: user.fullName,
      avatarUrl: user.avatarUrl,
      userType: user.userType.description,
      emailConfirmed: user.emailConfirmed,
      isActive: user.isActive,
      interestedArea: user.interestedArea,
      year: period?.year,
      period: period?.period,
    };

    return {
      accesstoken: await this.jwtService.signAsync(payload, {
        algorithm: 'HS256',
      }),
      refreshToken: await this.jwtService.signAsync(payload, {
        algorithm: 'HS256',
        expiresIn: process.env.EXPIRES_TIME,
      }),
    };
  }

  async refreshToken(user: User, period: Period) {
    const payload = {
      sub: user.id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      fullName: user.fullName,
      avatarUrl: user.avatarUrl,
      userType: user.userType.description,
      emailConfirmed: user.emailConfirmed,
      interestedArea: user.interestedArea,
      isActive: user.isActive,
      year: period.year,
      period: period.period,
    };

    return {
      accesstoken: this.jwtService.sign(payload),
    };
  }

  async validateUser(email: string, password: string) {
    try {
      const user = await this.authGetByEmail(email);

      const isPasswordValid = bcrypt.compareSync(password, user.password);

      if (!isPasswordValid) {
        throw new BadRequestException('Invalid password');
      }

      return user;
    } catch (error) {
      console.error(error);
    }
  }
}
