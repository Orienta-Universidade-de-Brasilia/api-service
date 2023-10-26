import { Module } from '@nestjs/common';
import { MailerModule } from '@nestjs-modules/mailer';
import { ConfigService } from '@nestjs/config/dist/config.service';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { EmailController } from './email.controller';
import { ConfirmationUseCase } from './use-case/confirmation.use-case';
import { GenerateCodeUseCase } from './use-case/generate-code.use-case';
import { ResendCodeUseCase } from './use-case/resend-code.use-case';
import { join } from 'path';
import { UserModule } from '../user/user.module';
import { EmailService } from './email.service';

@Module({
  imports: [
    UserModule,
    MailerModule.forRootAsync({
      useFactory: async (config: ConfigService) => ({
        transport: {
          host: config.get('MAIL_HOST'),
          port: 587,
          tls: {
            rejectUnauthorized: false,
          },
          secure: false,
          auth: {
            user: config.get('MAIL_USER'),
            pass: config.get('MAIL_PASSWORD'),
          },
          from: `"Orienta UnB" <${config.get('MAIL_FROM')}>`,
        },
        template: {
          dir: join(__dirname, 'templates'),
          adapter: new HandlebarsAdapter(),
          options: {
            strict: true,
          },
        },
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [
    EmailService,
    ConfirmationUseCase,
    GenerateCodeUseCase,
    ResendCodeUseCase,
  ],
  controllers: [EmailController],
})
export class EmailModule {}
