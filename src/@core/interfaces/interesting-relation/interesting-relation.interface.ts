import { UserModelView } from '@app/@core/auth/model-view/user.mv';
import { InterestingRelation } from '@app/@core/infra/db/schema/interesting-relation.schema';
import { InterestingDto } from '@app/@core/match/dto/interesting.dto';

export type interestDto = {
  participants: string[];
  year: number;
  period: number;
};

export const InterestingRelationRepositoryKey =
  'IInterestingRelationRepositoryKey';
export interface IInterestingRelationRepository {
  create(dto: interestDto): Promise<InterestingRelation>;
  updateInterest(id: string): Promise<boolean>;
  getInterested(
    dto: InterestingDto,
    user: UserModelView,
  ): Promise<InterestingRelation>;
  getByParticipantIds(dto: interestDto): Promise<InterestingRelation>;
}
