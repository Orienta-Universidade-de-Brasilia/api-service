import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { GetUserModelView } from './model-view/get-user.mv';
import { PartialCreateUserDto } from './dto/partial-create-user.dto';
import { CreateUserTypeDto } from './dto/create-user-type.dto';
import { GetUserTypeModelView } from './model-view/get-user-type.mv';

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async createUser(@Body() dto: CreateUserDto): Promise<GetUserModelView> {
    try {
      return await this.userService.createUser(dto);
    } catch (error) {
      throw error;
    }
  }

  @Post('/type')
  async createUserType(
    @Body() dto: CreateUserTypeDto,
  ): Promise<GetUserTypeModelView> {
    try {
      return await this.userService.createUserType(dto);
    } catch (error) {
      throw error;
    }
  }

  @Get(':id')
  async getUserById(@Param('id') id: string): Promise<GetUserModelView> {
    try {
      return await this.userService.getUserById(id);
    } catch (error) {
      throw error;
    }
  }

  @Put(':id')
  async partialCreateUser(
    @Param('id') id: string,
    @Body() dto: PartialCreateUserDto,
  ): Promise<GetUserModelView> {
    try {
      return await this.userService.partialCreateUser(id, dto);
    } catch (error) {
      throw error;
    }
  }
}
