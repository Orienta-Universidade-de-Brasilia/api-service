import { ApiProperty } from '@nestjs/swagger';
import {
  ArrayMinSize,
  ArrayNotEmpty,
  IsNotEmpty,
  IsOptional,
  IsPhoneNumber,
  IsString,
  Min,
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
