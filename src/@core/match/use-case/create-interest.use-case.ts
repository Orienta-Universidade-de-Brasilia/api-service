import { UserModelView } from '@app/@core/auth/model-view/user.mv';
import {
  IInterestingRelationRepository,
  InterestingRelationRepositoryKey,
} from '@app/@core/interfaces/interesting-relation/interesting-relation.interface';
import { InterestingDto } from '../dto/interesting.dto';
import {
  IUserRepository,
  UserRepositoryKey,
} from '@app/@core/interfaces/user/user.interface';
import {
  InterestingModelView,
  UpdateInterestingModelView,
} from '../model-view/interesting.mv';
import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { NotificationService } from '@app/@core/notification/notification.service';
import { EventMessage } from '@app/@core/notification/dto/event-message.dto';
import * as message from '@app/common/messages/response-messages.json';
import {
  INotifyRepository,
  NotifyRepositoryKey,
} from '@app/@core/interfaces/notify/notify.interface';

@Injectable()
export class CreateInterestUseCase {
  constructor(
    @Inject(InterestingRelationRepositoryKey)
    private readonly interestedRepository: IInterestingRelationRepository,
    @Inject(UserRepositoryKey)
    private readonly userRepository: IUserRepository,
    @Inject(NotifyRepositoryKey)
    private readonly notifyRepository: INotifyRepository,
    private readonly notificationService: NotificationService,
  ) {}

  async execute(
    dto: InterestingDto,
    user: UserModelView,
  ): Promise<InterestingModelView | UpdateInterestingModelView> {
    if (user.id === dto.targetId) {
      throw new BadRequestException('Invalid argument');
    }

    const targetUser = await this.userRepository.getById(dto.targetId);

    if (targetUser) {
      const hasInterestBefore =
        await this.interestedRepository.getByParticipantIds({
          participants: [dto.targetId, user.id],
          period: user.period,
          year: user.year,
        });
      if (
        hasInterestBefore &&
        hasInterestBefore.participants[1] === user.id &&
        !hasInterestBefore.targetInterest
      ) {
        const updated = await this.interestedRepository.updateInterest(
          hasInterestBefore._id,
        );

        const target = {
          period: user.period,
          year: user.year,
          id: targetUser._id,
          userType: targetUser.userType.description,
          email: targetUser.email,
          emailConfirmed: targetUser.emailConfirmed,
          isActive: targetUser.isActive,
          firstName: targetUser.firstName,
          lastName: targetUser.lastName,
        } satisfies UserModelView;

        await this.createNotification(
          {
            targetId: dto.targetId,
            message: `${user.firstName} ${user.lastName} ${message.notify.interested}`,
          },
          target,
        );

        return { updated };
      }
      if (hasInterestBefore && hasInterestBefore.participants[1] !== user.id) {
        throw new BadRequestException(
          'The action of interest has already been carried out',
        );
      }
      if (!hasInterestBefore) {
        const interest = await this.interestedRepository.create({
          participants: [user.id, targetUser._id.toString()],
          period: user.period,
          year: user.year,
        });

        const target = {
          period: user.period,
          year: user.year,
          id: targetUser._id.toString(),
          userType: targetUser.userType.description,
          email: targetUser.email,
          emailConfirmed: targetUser.emailConfirmed,
          isActive: targetUser.isActive,
        } satisfies UserModelView;

        await this.createNotification(
          {
            targetId: dto.targetId,
            message: `${user.firstName} ${user.lastName} ${message.notify.interested}`,
          },
          target,
        );
        return {
          activeUser: interest.participants[0],
          targetUser: interest.participants[1],
        };
      }
    } else {
      throw new BadRequestException(
        'There is no participant with this attributes',
      );
    }
  }

  async createNotification(dto: InterestingDto, targetUser: UserModelView) {
    await this.notificationService.emitter(
      { event: EventMessage.NOTIFY, message: dto.message },
      targetUser,
      undefined,
    );
  }
}
