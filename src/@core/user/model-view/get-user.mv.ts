import { CampusInformation } from '@infra/db/schema/campusInformation.schema';
import { Contact } from '@infra/db/schema/contact.schema';
import { Availability } from '@infra/db/schema/availability.schema';
import { InterestedArea } from '@infra/db/schema/interestedArea.schema';
import { UserType } from '@infra/db/schema/userType.schema';
import { BaseModelView } from './base.mv';

export class authModelView extends BaseModelView {
  firstName?: string;
  lastName?: string;
  fullName?: string;
  password?: string;
  email: string;
  avatarUrl?: string;
  userType: UserType;
  emailConfirmed?: boolean;
  isActive: boolean;
}

export class GetUserModelView extends BaseModelView {
  firstName?: string;
  lastName?: string;
  fullName?: string;
  globalId?: string;
  email: string;
  avatarUrl?: string;
  cellPhone?: string;
  userType: UserType;
  interestedArea?: InterestedArea[];
  availableToPair?: boolean;
  availability?: Availability;
  contact?: Contact;
  campusInformation?: CampusInformation;
  emailConfirmed?: boolean;
  isActive: boolean;
}
