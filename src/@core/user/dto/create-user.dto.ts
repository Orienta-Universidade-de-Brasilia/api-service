import { UserType } from '@app/@core/infra/db/schema/userType.schema';
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsOptional, Length } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ required: true })
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
  readonly userType?: UserType;
}
