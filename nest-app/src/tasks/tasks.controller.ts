import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Role } from '../auth/roles.decorator';
import { UserRole } from '../schema/User.schema';
import { JwtPayloadUser } from '../auth/auth.service';

@ApiTags('Tasks')
@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @ApiOperation({ summary: 'Create task' })
  @UseGuards(JwtAuthGuard)
  @Role(UserRole.ADMIN)
  @Post()
  create(@Body() createTaskDto: CreateTaskDto, @Request() req) {
    return this.tasksService.create(createTaskDto, req.user);
  }

  @ApiOperation({ summary: 'Get all tasks' })
  @Get('')
  findAll() {
    return this.tasksService.findAll();
  }

  @ApiOperation({ summary: 'Get task by ID' })
  @Get(':id')
  @Role(UserRole.USER, UserRole.ADMIN)
  findOne(@Request() req, @Param('id') id: string) {
    return this.tasksService.findOne(id, (req.user as JwtPayloadUser).role);
  }

  @ApiOperation({ summary: 'Update task by ID' })
  @UseGuards(JwtAuthGuard)
  @Role(UserRole.ADMIN)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTaskDto: UpdateTaskDto) {
    return this.tasksService.update(+id, updateTaskDto);
  }

  @ApiOperation({ summary: 'Delete task by ID' })
  @UseGuards(JwtAuthGuard)
  @Role(UserRole.ADMIN)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.tasksService.remove(+id);
  }
}
