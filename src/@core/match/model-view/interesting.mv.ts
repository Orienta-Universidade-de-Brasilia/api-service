import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsString } from 'class-validator';

export class InterestingModelView {
  @ApiProperty()
  @IsString()
  targetUser: string;

  @ApiProperty()
  @IsString()
  activeUser: string;
}

export class UpdateInterestingModelView {
  @ApiProperty()
  @IsBoolean()
  updated: boolean;
}
