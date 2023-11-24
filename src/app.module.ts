import { HealthCheckController } from '@core/healthcheck/healthcheck.controller';
import { CloudinaryModule } from '@core/cloudinary/cloudinary.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigService } from '@config/configuration.config';
import { SwaggerModule } from '@common/swagger/swagger.module';
import { InfraModule } from '@config/infra.module';
import { AuthModule } from '@core/auth/auth.module';
import { UserModule } from '@core/user/user.module';
import { Module } from '@nestjs/common';
import { EmailModule } from './@core/email/email.module';
import { PeriodModule } from './@core/period/period.module';

const config = new ConfigService().get('mongo');

const restImports = [
  MongooseModule.forRoot(
    `mongodb+srv://${config.user}:${config.password}@${config.host}/${config.db}?retryWrites=true&w=majority`,
  ),
  CloudinaryModule,
  SwaggerModule,
  InfraModule,
  AuthModule,
  UserModule,
  EmailModule,
  PeriodModule,
];

@Module({
  imports: [...restImports],
  controllers: [HealthCheckController],
})
export class AppModule {}
