import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateUserTypeDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  description: string;
}
