import { Injectable } from '@nestjs/common';
import { GetUserModelView } from '../model-view/get-user.mv';
import { UserModelView } from '@app/@core/auth/model-view/user.mv';
import { RecommendationEnum } from '../types/recommendation.types';

@Injectable()
export class SetRecommendationUseCase {
  constructor() {}

  async execute(
    currentUser: UserModelView,
    users: GetUserModelView[],
  ): Promise<GetUserModelView[]> {
    users.forEach((user) => {
      const simility = this.calculateSimility(currentUser, user);

      user.recommendationValue = simility;

      if (simility >= 0 && simility < 0.3) {
        user.recommendation = RecommendationEnum.LOW;
      } else if (simility > 0.5) {
        user.recommendation = RecommendationEnum.HIGH;
      } else {
        user.recommendation = RecommendationEnum.NEUTRAL;
      }
    });

    users.sort((a, b) => b.recommendationValue - a.recommendationValue);

    return users;
  }

  calculateSimility(
    currentUser: UserModelView,
    user: GetUserModelView,
  ): number {
    const intersection = currentUser.interestedArea.filter((value) =>
      user.interestedArea.includes(value),
    );

    const similarity = intersection.length / currentUser.interestedArea.length;
    return similarity;
  }
}
