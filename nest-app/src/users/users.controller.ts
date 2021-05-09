import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Request,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { User, UserRole } from '../schema/User.schema';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Role } from 'src/auth/roles.decorator';
import { CreateUserDto } from './dto/createUser.dto';
import { UpdateUserDto } from './dto/updateUser.dto';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @ApiOperation({ summary: 'Register new user' })
  @Post('')
  createUser(@Body() user: CreateUserDto) {
    return this.usersService.createUser(user);
  }

  @ApiOperation({ summary: 'Get profile' })
  @ApiResponse({ status: 200 })
  @UseGuards(JwtAuthGuard)
  @Role(UserRole.SUSPENDED, UserRole.USER, UserRole.ADMIN)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }

  @ApiOperation({ summary: 'Get user by ID' })
  @ApiResponse({ status: 200, type: User })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOneById(id);
  }

  @ApiOperation({ summary: 'Update user' })
  @UseGuards(JwtAuthGuard)
  @Role(UserRole.USER, UserRole.ADMIN)
  @Put(`:id`)
  updateUser(@Param('id') id: string, @Body() user: UpdateUserDto) {
    return this.usersService.updateUser(id, user);
  }
}
