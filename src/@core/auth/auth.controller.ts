import { Controller, Post, UseGuards, Req } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Public } from '@common/decorators/auth.decorator';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from '@common/guards/local-auth.guard';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Req() req: any) {
    return await this.authService.login(req.user);
  }
}
