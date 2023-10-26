import { ApiProperty } from '@nestjs/swagger';
import {
  ArrayMinSize,
  ArrayNotEmpty,
  IsNotEmpty,
  IsOptional,
  IsPhoneNumber,
  IsString,
} from 'class-validator';

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
  @IsString()
  @IsOptional()
  fullName?: string;

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
  avaliableToPair?: boolean;

  @ApiProperty({ required: false })
  @IsOptional()
  availability?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  campusInformation?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  contact?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  pictureId?: string;
}
