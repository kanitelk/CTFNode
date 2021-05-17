import { Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Task, TaskDocument } from '../schema/Task.schema';
import { Model } from 'mongoose';
import { JwtPayloadUser } from '../auth/auth.service';
import { UserRole } from '../schema/User.schema';

@Injectable()
export class TasksService {
  constructor(@InjectModel(Task.name) private taskModel: Model<TaskDocument>) {}

  public taskProjectionUser: { [key in keyof Task]?: number } = {
    flag: 0,
  };

  async create(createTaskDto: CreateTaskDto, user: JwtPayloadUser) {
    const createdTask = new this.taskModel({
      ...createTaskDto,
      author: user._id,
    });
    await createdTask.save();
    return createdTask;
  }

  findAll() {
    return this.taskModel.find({}, this.taskProjectionUser);
  }

  findOne(_id: string, role: UserRole) {
    return this.taskModel.findOne(
      { _id },
      role !== UserRole.ADMIN && this.taskProjectionUser,
    );
  }

  async update(id: string, updateTaskDto: UpdateTaskDto) {
    return this.taskModel.findOneAndUpdate({ _id: id }, updateTaskDto, {
      new: true,
    });
  }

  remove(id: string) {
    return this.taskModel.deleteOne({ _id: id });
  }
}
