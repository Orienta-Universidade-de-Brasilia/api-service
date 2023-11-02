import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UserService } from '../user/user.service';
import { User } from '../infra/db/schema/user.schema';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async login(user: User) {
    const payload = {
      sub: user.id,
      fullName: user.fullName,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      avatarUrl: user.avatarUrl,
      userType: user.userType.description,
      emailConfirmed: user.emailConfirmed,
      isActive: user.isActive,
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

  async refreshToken(user) {
    const payload = {
      sub: user.id,
      fullName: user.fullName,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      avatarUrl: user.avatarUrl,
      userType: user.userType?.description,
      emailConfirmed: user.emailConfirmed,
      isActive: user.isActive,
    };

    return {
      accesstoken: this.jwtService.sign(payload),
    };
  }

  async validateUser(email: string, password: string) {
    try {
      const user = await this.userService.authGetByEmail(email);

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
