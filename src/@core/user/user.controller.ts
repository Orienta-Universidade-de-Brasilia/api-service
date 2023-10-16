import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { GetUserModelView } from './model-view/get-user.mv';

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
}
