import { UserType } from '@infra/db/schema/userType.schema';
import { BaseModelView } from './base.mv';
import { User } from '@app/@core/infra/db/schema/user.schema';
import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsBoolean,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class authModelView extends BaseModelView {
  email: string;
  firstName?: string;
  lastName?: string;
  fullName?: string;
  avatarUrl?: string;
  userType?: UserType;
  emailConfirmed?: boolean;
  interestedArea?: string[];
  isActive?: boolean;
  year?: string;
  period?: string;
  password: string;
}

export class GetUserModelView extends BaseModelView {
  @ApiProperty()
  @IsString()
  id: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  firstName?: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  lastName?: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  fullName?: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  globalId?: string;

  @ApiProperty({ required: true })
  @IsString()
  email: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  avatarUrl?: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  cellPhone?: string;

  @ApiProperty()
  @IsEnum({ type: UserType })
  userType: UserType;

  @ApiProperty()
  @IsArray()
  @IsOptional()
  interestedArea?: string[];

  @ApiProperty({ required: false, default: false })
  @IsBoolean()
  @IsOptional()
  availableToPair?: boolean;

  availability?: number;

  @ApiProperty({ required: false, default: false })
  @IsBoolean()
  @IsOptional()
  emailConfirmed?: boolean;

  @ApiProperty({ required: true })
  @IsBoolean()
  isActive: boolean;

  @IsString()
  @IsOptional()
  recommendation?: string;

  @IsNumber()
  @IsOptional()
  recommendationValue?: number;

  initialize(model: User) {
    this.id = model._id;
    this.firstName = model.firstName;
    this.lastName = model.lastName;
    this.fullName = model.fullName;
    this.email = model.email;
    this.avatarUrl = model.avatarUrl;
    this.cellPhone = model.cellPhone;
    this.userType = model.userType;
    this.interestedArea = model.interestedArea.map((area) => area);
    this.availableToPair = model.availableToPair;
    this.availability = model.availability;
    this.emailConfirmed = model.emailConfirmed;
    this.isActive = model.isActive;
    this.recommendation = undefined;
  }
}
