import { Requester } from '@app/common/decorators/user.decorator';
import {
  Body,
  Controller,
  Post,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UserModelView } from '../auth/model-view/user.mv';
import { JwtAuthGuard } from '@app/common/guards/jwt-auth.guard';
import { CreatePeriodDto } from './dto/create-period.dto';
import { PeriodService } from './period.service';

@ApiTags('Period')
@Controller('period')
@UseGuards(JwtAuthGuard)
export class PeriodController {
  constructor(private readonly periodService: PeriodService) {}

  @Post()
  async createPeriod(
    @Body() dto: CreatePeriodDto,
    @Requester(new ValidationPipe({ validateCustomDecorators: true }))
    user: UserModelView,
  ) {
    try {
      return await this.periodService.createPeriod(dto, user);
    } catch (error) {
      throw error;
    }
  }
}
