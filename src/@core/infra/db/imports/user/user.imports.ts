import { UserType, UserTypeSchema } from '@infra/db/schema/userType.schema';
import {
  InterestedArea,
  InterestedAreaSchema,
} from '@infra/db/schema/interestedArea.schema';
import {
  Availability,
  AvailabilitySchema,
} from '@infra/db/schema/availability.schema';
import { PairUp, PairUpSchema } from '@infra/db/schema/pairUp.schema';
import { User, UserSchema } from '@infra/db/schema/user.schema';
import { Code, CodeSchema } from '../../schema/code.schema';

export const UserFeature = [
  { name: User.name, schema: UserSchema },
  { name: UserType.name, schema: UserTypeSchema },
  { name: InterestedArea.name, schema: InterestedAreaSchema },
  { name: Availability.name, schema: AvailabilitySchema },
  { name: PairUp.name, schema: PairUpSchema },
  { name: Code.name, schema: CodeSchema },
];
