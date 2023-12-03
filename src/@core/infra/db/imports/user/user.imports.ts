import { UserType, UserTypeSchema } from '@infra/db/schema/userType.schema';
import { User, UserSchema } from '@infra/db/schema/user.schema';
import { Code, CodeSchema } from '../../schema/code.schema';
import { PairUp, PairUpSchema } from '../../schema/pair-up.schema';

export const UserFeature = [
  { name: User.name, schema: UserSchema },
  { name: UserType.name, schema: UserTypeSchema },
  { name: Code.name, schema: CodeSchema },
];
