import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateSolveDto } from './dto/create-solve.dto';
import { UpdateSolveDto } from './dto/update-solve.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Solve, SolveDocument } from 'src/schema/Solve.schema';
import { Model } from 'mongoose';
import { UsersService } from '../users/users.service';
import { TasksService } from '../tasks/tasks.service';
import { User, UserDocument } from '../schema/User.schema';

@Injectable()
export class SolvesService {
  constructor(
    @InjectModel(Solve.name) private solveModel: Model<SolveDocument>,
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private usersService: UsersService,
    private tasksService: TasksService,
  ) {}

  async create(solve: CreateSolveDto, userId: string) {
    const task = await this.tasksService.findOne(solve.task);
    const user = await this.usersService.findOneById(userId);

    if (!task) {
      throw new HttpException('Task not found', HttpStatus.BAD_REQUEST);
    }
    if (!user) {
      throw new HttpException('User not found', HttpStatus.BAD_REQUEST);
    }

    // Team operations
    if (user.team) {
      const similarSolveByTeam = await this.solveModel.findOne({
        team: user.team,
        correct: true,
      });
      if (similarSolveByTeam) {
        throw new HttpException(
          'Already solved by you team',
          HttpStatus.BAD_REQUEST,
        );
      }
    } else {
      const similarSolve = await this.solveModel.findOne({
        user: userId,
        correct: true,
      });

      if (similarSolve) {
        throw new HttpException(
          'Already solved by you',
          HttpStatus.BAD_REQUEST,
        );
      }
    }

    const isCorrect =
      task.flag.trim().toLowerCase() === solve.value.trim().toLowerCase();

    const score = isCorrect ? task.score : 0;

    if (isCorrect) {
      // Increase team/user scores
      await this.userModel.findOneAndUpdate(
        { _id: userId },
        { $inc: { score } },
      );

      if (user.team) {
        // TODO: increase team score
      }
    }

    const createdSolve = new this.solveModel({
      ...solve,
      user: user._id,
      correct: isCorrect,
      score,
      team: user.team ?? null,
    });
    await createdSolve.save();

    if (isCorrect) {
      return createdSolve;
    } else {
      throw new HttpException('Wrong answer', HttpStatus.BAD_REQUEST);
    }
  }

  findUserSolvesByTask(taskId: string, userId: string) {
    return this.solveModel.find({ task: taskId, user: userId });
  }

  findOne(_id: string) {
    return this.solveModel.findOne({ _id });
  }

  update(id: number, updateSolveDto: UpdateSolveDto) {
    return `This action updates a #${id} solve`;
  }

  remove(id: number) {
    return `This action removes a #${id} solve`;
  }
}
