import { JwtAuthGuard } from '@app/common/guards/jwt-auth.guard';
import { Controller, Get, UseGuards, ValidationPipe } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Requester } from '@app/common/decorators/user.decorator';
import { UserModelView } from '../auth/model-view/user.mv';
import { NotificationService } from './notification.service';
import { NotificationsModelView } from './model-view/get-notifications-by-userid';

@ApiTags('Notifications')
@Controller('notifications')
@UseGuards(JwtAuthGuard)
export class NotificationsController {
  constructor(private readonly notificationService: NotificationService) {}

  @Get()
  async getNotifications(
    @Requester(new ValidationPipe({ validateCustomDecorators: true }))
    user: UserModelView,
  ): Promise<NotificationsModelView> {
    try {
      return await this.notificationService.getNotificationsByUserId(user);
    } catch (error) {
      throw error;
    }
  }
}
