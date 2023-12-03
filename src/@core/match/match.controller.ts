import { JwtAuthGuard } from '@app/common/guards/jwt-auth.guard';
import {
  Controller,
  Param,
  Post,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { MatchService } from './match.service';
import {
  InterestingModelView,
  UpdateInterestingModelView,
} from './model-view/interesting.mv';
import { InterestingDto } from './dto/interesting.dto';
import { Requester } from '@app/common/decorators/user.decorator';
import { UserModelView } from '../auth/model-view/user.mv';

@ApiTags('Match')
@Controller('match')
@UseGuards(JwtAuthGuard)
export class MatchController {
  constructor(private readonly matchService: MatchService) {}

  @Post(':targetId')
  async createInterestRelation(
    @Param() dto: InterestingDto,
    @Requester(new ValidationPipe({ validateCustomDecorators: true }))
    user: UserModelView,
  ): Promise<InterestingModelView | UpdateInterestingModelView> {
    try {
      return await this.matchService.createInterest(dto, user);
    } catch (error) {
      throw error;
    }
  }
}
