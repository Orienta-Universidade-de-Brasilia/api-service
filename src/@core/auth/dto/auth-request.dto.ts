import { User } from '@app/@core/infra/db/schema/user.schema';
import { Request } from 'express';

export interface AuthRequest extends Request {
  user: User;
}
