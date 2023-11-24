import { ResendCodeUseCase } from './use-case/resend-code.use-case';
import { BadRequestException, Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { GenerateCodeUseCase } from './use-case/generate-code.use-case';
import { ConfirmationUseCase } from './use-case/confirmation.use-case';
import { UserService } from '../user/user.service';
import { GetUserModelView } from '../user/model-view/get-user.mv';
import { HttpStatusCode } from 'axios';

@Injectable()
export class EmailService {
  constructor(
    private readonly mailerService: MailerService,
    private readonly generateCodeUseCase: GenerateCodeUseCase,
    private readonly resendCodeUseCase: ResendCodeUseCase,
    private readonly confirmationUseCase: ConfirmationUseCase,
    private readonly userService: UserService,
  ) {}

  async sendConfirmationEmail(to: string) {
    const response = await this.generateCodeUseCase.execute(to);

    if (!response) {
      throw new BadRequestException(
        'Cannot send e-mail confirmation. try again.',
      );
    }

    await this.mailerService.sendMail({
      to,
      subject: 'Confirmação de Email - Orienta UnB',
      template: './confirmation',
      context: {
        name: response.name,
        code: response.code,
      },
    });

    return {
      message: 'E-mail sent successfully',
      status: HttpStatusCode.Created,
    };
  }

  async resendConfirmationEmail(to: string) {
    const response = await this.resendCodeUseCase.execute(to);

    if (!response) {
      throw new BadRequestException(
        'Cannot send e-mail confirmation. try again.',
      );
    }

    await this.mailerService.sendMail({
      to,
      subject: 'Confirmação de Email - Orienta UnB',
      template: './confirmation',
      context: {
        name: response.name,
        code: response.code,
      },
    });

    return {
      message: 'E-mail resent successfully',
      status: HttpStatusCode.Ok,
    };
  }

  async confirmCode(email: string, code: string): Promise<GetUserModelView> {
    const response = await this.confirmationUseCase.execute(email, code);

    if (!response) {
      throw new BadRequestException('Cannot confirm e-mail, try again');
    }

    const user = await this.userService.getByEmail(email);

    return user;
  }
}
