import {
  Controller,
  Post,
  UseGuards,
  Req,
  Get,
  ValidationPipe,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Public } from '@common/decorators/auth.decorator';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from '@common/guards/local-auth.guard';
import { AuthRequest } from './dto/auth-request.dto';
import { RefreshJwtAuthGuard } from '@app/common/guards/refresh-jwt-auth.guard';
import { Requester } from '@app/common/decorators/user.decorator';
import { JwtAuthGuard } from '@app/common/guards/jwt-auth.guard';
import { UserModelView } from './model-view/user.mv';
import { PeriodService } from '../period/period.service';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly periodService: PeriodService,
  ) {}

  @Public()
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Req() req: AuthRequest) {
    const period = await this.periodService.getCurrentPeriod();
    return await this.authService.login(req.user, period);
  }

  @Public()
  @UseGuards(RefreshJwtAuthGuard)
  @Post('refresh')
  async refresh(@Req() req: AuthRequest) {
    const period = await this.periodService.getCurrentPeriod();
    return await this.authService.refreshToken(req.user, period);
  }

  @Get('/user')
  @UseGuards(JwtAuthGuard)
  async findOne(
    @Requester(new ValidationPipe({ validateCustomDecorators: true }))
    user: UserModelView,
  ) {
    console.log(user);
  }
}
