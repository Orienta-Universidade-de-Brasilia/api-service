import { UserType } from '../types/user.types';

export class GetUserModelView {
  _id: string;
  firstName?: string;
  lastName?: string;
  password?: string;
  fullName?: string;
  globalId?: string;
  email: string;
  imageUrl?: string;
  cellPhone?: string;
  type: `${UserType}`;
  interestArea?: string[];
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
}
