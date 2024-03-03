import {
  Body,
  Controller,
  Delete,
  Param,
  Post,
  UseGuards,
  UsePipes,
} from '@nestjs/common';
import { UsersService } from './users.service';
import {
  CreateUserDto,
  CreateUserResponseDto,
  createUserSchema,
} from './dto/create-user.dto';
import { ValidationPipe } from '../shared/pipes/validation.pipe';
import { ApiBearerAuth, ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '../auth/auth.guard';
import { User } from '../users/dto/user.decorator';
import { UserData } from './dto/user.interface';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post()
  @ApiCreatedResponse({
    type: CreateUserResponseDto,
  })
  @UsePipes(new ValidationPipe(createUserSchema))
  async createUser(@Body() createUserDto: CreateUserDto) {
    return this.usersService.createUser(createUserDto);
  }

  @ApiBearerAuth('accessToken')
  @Delete(':id')
  @UseGuards(AuthGuard)
  async deleteUser(@User() user: UserData, @Param('id') id: string) {
    return this.usersService.deleteUser(user, id);
  }
}
