import { UserModelView } from '@app/@core/auth/model-view/user.mv';
import { Period } from '@app/@core/infra/db/schema/period.schema';

export const PeriodRepositoryKey = 'IPeriodRepositoryKey';
export interface IPeriodRepository {
  create(year: number, period: number, user: UserModelView): Promise<Period>;
  getPeriodBymonthAndYear(period: number, year: number): Promise<Period>;
  getPeriodByYear(year: number): Promise<Period[]>;
}
