import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { AuthenticateUserUseCase } from './use-case/authentication.use-case';
import { LocalStrategy } from '@common/strategies/local.strategy';
import { JwtStrategy } from '@common/strategies/jwt.strategy';
import { UserModule } from '../user/user.module';

@Module({
  imports: [
    UserModule,
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET_KEY,
      signOptions: { expiresIn: '30d' },
    }),
  ],
  providers: [AuthService, AuthenticateUserUseCase, LocalStrategy, JwtStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
