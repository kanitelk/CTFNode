import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateTeamDto } from './dto/create-team.dto';
import { UpdateTeamDto } from './dto/update-team.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument, UserRole } from '../schema/User.schema';
import { Model } from 'mongoose';
import { UsersService } from '../users/users.service';
import { Team, TeamDocument } from 'src/schema/Team.schema';

@Injectable()
export class TeamsService {
  constructor(
    @InjectModel(Team.name) private teamModel: Model<TeamDocument>,
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private usersService: UsersService,
  ) {}

  async create(createTeamDto: CreateTeamDto, userId: string, role: UserRole) {
    if (role === UserRole.USER) {
      const user = await this.usersService.findOneById(userId);
      if (user.team) {
        throw new HttpException(
          'At first, leave you current team',
          HttpStatus.BAD_REQUEST,
        );
      }
    }

    const createdTeam = new this.teamModel({ ...createTeamDto, owner: userId });
    await createdTeam.save();

    // Assign user to created team
    if (role === UserRole.USER) {
      this.userModel.findOneAndUpdate(
        { _id: userId },
        { team: createdTeam._id },
      );
    }

    return createdTeam;
  }

  findAll() {
    return this.teamModel.find({});
  }

  findOne(_id: string) {
    return this.teamModel.findOne({ _id });
  }

  async update(
    id: string,
    updateTeamDto: UpdateTeamDto,
    userId: string,
    role: UserRole,
  ) {
    const team = await this.teamModel.findOne({ _id: id });
    if (role !== UserRole.ADMIN && String(team.owner) !== String(userId)) {
      throw new HttpException(
        'You are not owner of team',
        HttpStatus.FORBIDDEN,
      );
    }

    return this.teamModel.findOneAndUpdate({ _id: id }, updateTeamDto, {
      new: true,
    });
  }

  async remove(id: string, userId: string, role: UserRole) {
    const team = await this.teamModel.findOne({ _id: id });

    if (role !== UserRole.ADMIN && String(userId) !== String(team.owner)) {
      throw new HttpException(
        'You are not owner of team',
        HttpStatus.FORBIDDEN,
      );
    }

    await this.teamModel.deleteOne({ _id: id });
    await this.userModel.updateMany({ team: id }, { team: null });
    return { success: 'ok' };
  }
}
