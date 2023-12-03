import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';

@Injectable()
export class RefreshTokenStrategy extends PassportStrategy(
  Strategy,
  'jwt-refresh',
) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromBodyField('refresh'),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET_KEY,
    });
  }

  async validate(payload: any) {
    return {
      id: payload.sub,
      email: payload.email,
      firstName: payload.firstName,
      lastName: payload.lastName,
      fullName: payload.fullName,
      avatarUrl: payload.avatarUrl,
      userType: payload.userType,
      interestedArea: payload.interestedArea,
      emailConfirmed: payload.emailConfirmed,
      isActive: payload.isActive,
      year: payload.year,
      period: payload.period,
    };
  }
}
