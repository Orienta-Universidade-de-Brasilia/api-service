import { CampusInformation } from '@infra/db/schema/campusInformation.schema';
import { Contact } from '@infra/db/schema/contact.schema';
import { Availability } from '@infra/db/schema/availability.schema';
import { UserType } from '@infra/db/schema/userType.schema';
import { BaseModelView } from './base.mv';
import { User } from '@app/@core/infra/db/schema/user.schema';

export class authModelView extends BaseModelView {
  email: string;
  firstName?: string;
  lastName?: string;
  fullName?: string;
  avatarUrl?: string;
  userType?: UserType;
  emailConfirmed?: boolean;
  isActive?: boolean;
  year?: string;
  period?: string;
  password: string;
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
  interestedArea?: string[];
  availableToPair?: boolean;
  availability?: Availability;
  contact?: Contact;
  campusInformation?: CampusInformation;
  emailConfirmed?: boolean;
  isActive: boolean;

  initialize(model: User) {
    this._id = model._id;
    this.firstName = model.firstName;
    this.lastName = model.lastName;
    this.fullName = model.fullName;
    this.email = model.email;
    this.avatarUrl = model.avatarUrl;
    this.cellPhone = model.cellPhone;
    this.userType = model.userType;
    this.interestedArea = model.interestedArea.map((area) => area.description);
    this.availableToPair = model.availableToPair;
    this.availability = model.availability;
    this.emailConfirmed = model.emailConfirmed;
    this.isActive = model.isActive;
  }
}
