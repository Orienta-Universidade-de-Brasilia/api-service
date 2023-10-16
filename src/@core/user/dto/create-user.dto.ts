import { ApiProperty } from '@nestjs/swagger';
import {
  ArrayMinSize,
  ArrayNotEmpty,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsPhoneNumber,
  IsString,
  Length,
  Min,
} from 'class-validator';
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

export class PartialCreateUserDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  lastName: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsPhoneNumber('BR')
  cellPhone: string;

  @ApiProperty()
  @ArrayNotEmpty()
  @ArrayMinSize(3)
  interestArea: string[];

  @ApiProperty({ required: false, default: false })
  @IsOptional()
  wantPair?: boolean;

  @ApiProperty({ required: false })
  @IsOptional()
  @Min(1)
  availability?: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @Min(1)
  pairAvailability?: number;
}
