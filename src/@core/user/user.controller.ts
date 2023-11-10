import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { GetUserModelView } from './model-view/get-user.mv';
import { PartialCreateUserDto } from './dto/partial-create-user.dto';
import { CreateUserTypeDto } from './dto/create-user-type.dto';
import { GetUserTypeModelView } from './model-view/get-user-type.mv';
import { Requester } from '@app/common/decorators/user.decorator';
import { UserModelView } from '../auth/model-view/user.mv';
import { JwtAuthGuard } from '@app/common/guards/jwt-auth.guard';
import { PageDto, PageOptionsDto } from '../common/dto';

@ApiTags('User')
@Controller('user')
@UseGuards(JwtAuthGuard)
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

  @Get()
  async findOne(
    @Requester(new ValidationPipe({ validateCustomDecorators: true }))
    user: UserModelView,
    @Query() filters: PageOptionsDto,
  ): Promise<PageDto<GetUserModelView>> {
    try {
      return await this.userService.listUsers(user, filters);
    } catch (error) {
      throw error;
    }
  }
}
