import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional } from 'class-validator';

export class InterestingDto {
  @ApiProperty()
  @IsNotEmpty()
  targetId: string;

  @ApiProperty()
  @IsOptional()
  message?: string;
}
