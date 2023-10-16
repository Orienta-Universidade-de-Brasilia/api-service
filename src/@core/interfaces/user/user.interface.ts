import { User } from '@app/@core/infra/db/schema/user.schema';
import { CreateUserDto } from '@app/@core/user/dto/create-user.dto';
import { PartialCreateUserDto } from '@app/@core/user/dto/partial-create-user.dto';

export const UserRepositoryKey = 'IUserRepositoryKey';
export interface IUserRepository {
  create(dto: CreateUserDto): Promise<User>;
  getByEmail(email: string): Promise<User>;
  getById(id: string): Promise<User>;
  partialCreate(id: string, dto: PartialCreateUserDto): Promise<number>;
}
