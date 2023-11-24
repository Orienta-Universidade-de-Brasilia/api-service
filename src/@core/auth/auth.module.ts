import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { LocalStrategy } from '@common/strategies/local.strategy';
import { JwtStrategy } from '@common/strategies/jwt.strategy';
import { UserModule } from '../user/user.module';
import { LoginValidationMiddleware } from '@app/common/middleware/jwt.middleware';
import { RefreshTokenStrategy } from '@app/common/strategies/refresh-token.strategy';
import { PeriodModule } from '../period/period.module';
import { GetAuthByEmailUseCase } from './use-case/get-auth-by-email.use-case';

@Module({
  imports: [
    UserModule,
    PeriodModule,
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET_KEY,
      signOptions: { expiresIn: '5h' },
    }),
  ],
  providers: [
    AuthService,
    LocalStrategy,
    RefreshTokenStrategy,
    JwtStrategy,
    GetAuthByEmailUseCase,
  ],
  controllers: [AuthController],
})
export class AuthModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoginValidationMiddleware).forRoutes('/api/auth/login');
  }
}
