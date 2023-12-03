import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class UserModelView {
  @IsString()
  @IsNotEmpty()
  id: string;

  @IsString()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsOptional()
  firstName?: string;

  @IsString()
  @IsOptional()
  lastName?: string;

  @IsNotEmpty()
  userType: string;

  @IsNotEmpty()
  @IsBoolean()
  emailConfirmed: boolean;

  @IsOptional()
  interestedArea?: string[];

  @IsNotEmpty()
  @IsBoolean()
  isActive: boolean;

  @IsNotEmpty()
  @IsNumber()
  period: number;

  @IsNotEmpty()
  @IsNumber()
  year: number;
}
