import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsOptional, Length } from 'class-validator';
import { UserType } from '../types/user.types';

export class CreateUserDto {
  @ApiProperty()
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty()
  @IsNotEmpty()
  @Length(6, 24)
  password: string;

  @ApiProperty({ required: false, default: true })
  @IsOptional()
  readonly isActive?: boolean;

  @ApiProperty({ required: false })
  @IsOptional()
  readonly role?: `${UserType}`;
}
