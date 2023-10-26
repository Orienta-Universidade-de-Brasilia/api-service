import { Controller, Post, Body, Put } from '@nestjs/common';
import { EmailService } from './email.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Mailer')
@Controller('mailer')
export class EmailController {
  constructor(private readonly emailService: EmailService) {}

  @Post('send')
  async sendConfirmationCode(@Body('email') email: string) {
    try {
      const response = await this.emailService.sendConfirmationEmail(email);
      return response;
    } catch (error) {
      throw error;
    }
  }

  @Put('resend')
  async resendConfirmationCode(@Body('email') email: string) {
    try {
      const response = await this.emailService.resendConfirmationEmail(email);
      return response;
    } catch (error) {
      throw error;
    }
  }

  @Put('confirm-email')
  async confirmCode(@Body('code') code: string, @Body('email') email: string) {
    try {
      const response = await this.emailService.confirmCode(email, code);
      return response;
    } catch (error) {
      throw error;
    }
  }
}
