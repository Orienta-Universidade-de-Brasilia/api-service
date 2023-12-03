import { NotificationService } from './../notification/notification.service';
import { BadRequestException, Injectable } from '@nestjs/common';
import { UserModelView } from '../auth/model-view/user.mv';
import { GetInterestUseCase } from './use-case/get-interest.use-case';
import { CreateInterestUseCase } from './use-case/create-interest.use-case';
import { InterestingDto } from './dto/interesting.dto';
import {
  InterestingModelView,
  UpdateInterestingModelView,
} from './model-view/interesting.mv';
import { EventMessage } from '../notification/dto/event-message.dto';
import * as message from '@app/common/messages/response-messages.json';

@Injectable()
export class MatchService {
  constructor(
    private readonly notificationService: NotificationService,
    private readonly createInterestUseCase: CreateInterestUseCase,
    private readonly getInterestUseCase: GetInterestUseCase,
  ) {}

  async createInterest(
    dto: InterestingDto,
    user: UserModelView,
  ): Promise<InterestingModelView | UpdateInterestingModelView> {
    const response = await this.createInterestUseCase.execute(dto, user);

    if (!response) {
      throw new BadRequestException('Failed to create interest request');
    }

    await this.validateMatch(dto, user);

    return response;
  }

  async validateMatch(dto: InterestingDto, user: UserModelView): Promise<void> {
    const interestedRelation = await this.getInterestUseCase.execute(dto, user);
    if (interestedRelation.userInterest && interestedRelation.targetInterest) {
      await this.notificationService.emitter(
        {
          event: EventMessage.MATCH,
          message: `${message.notify.match}`,
        },
        user,
      );
    }
  }
}
