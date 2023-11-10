import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreatePeriodDto {
  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  year: number;
}
