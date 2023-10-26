import { Code } from '@app/@core/infra/db/schema/code.schema';
import { User } from '@app/@core/infra/db/schema/user.schema';
import { UserType } from '@app/@core/infra/db/schema/userType.schema';
import { CreateUserDto } from '@app/@core/user/dto/create-user.dto';
import { PartialCreateUserDto } from '@app/@core/user/dto/partial-create-user.dto';

export const UserRepositoryKey = 'IUserRepositoryKey';
export interface IUserRepository {
  create(dto: CreateUserDto): Promise<User>;
  getByEmail(email: string): Promise<User>;
  getById(id: string): Promise<User>;
  partialCreate(id: string, dto: PartialCreateUserDto): Promise<number>;
  getUserTypeByName(type: string): Promise<UserType>;
  createUserType(dto: string): Promise<UserType>;
  saveCodeGenerated(email: string, code: string): Promise<Code>;
  updateCodeByUserId(userId: string, code: string): Promise<number>;
  getCodeByUserId(userId: string): Promise<Code>;
  confirmEmailByUserId(userId: string, confirmation: boolean): Promise<boolean>;
}
