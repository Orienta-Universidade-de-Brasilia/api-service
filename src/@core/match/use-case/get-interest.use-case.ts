import { UserModelView } from '@app/@core/auth/model-view/user.mv';
import {
  IInterestingRelationRepository,
  InterestingRelationRepositoryKey,
} from '@app/@core/interfaces/interesting-relation/interesting-relation.interface';
import { InterestingDto } from '../dto/interesting.dto';
import { InterestingRelation } from '@app/@core/infra/db/schema/interesting-relation.schema';
import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class GetInterestUseCase {
  constructor(
    @Inject(InterestingRelationRepositoryKey)
    private readonly interestedRepository: IInterestingRelationRepository,
  ) {}

  async execute(
    dto: InterestingDto,
    user: UserModelView,
  ): Promise<InterestingRelation> {
    return await this.interestedRepository.getInterested(dto, user);
  }
}
