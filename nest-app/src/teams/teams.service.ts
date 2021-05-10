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

  private teamProjection: { [key in keyof Team]?: number } = {
    password: 0,
  };

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

    const createdTeam = new this.teamModel({
      ...createTeamDto,
      owner: userId,
      members: [userId],
    });
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

  findOne(_id: string) {
    return this.teamModel.findOne({ _id }, this.teamProjection);
  }

  findAll() {
    return this.teamModel.find({}, this.teamProjection);
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

  // Join to team by user
  async join(teamId: string, userId: string, password: string) {
    const team = await this.teamModel.findOne({ _id: teamId });
    const user = await this.userModel.findOne({ _id: userId });

    if (!team) {
      throw new HttpException('Team not found', HttpStatus.BAD_REQUEST);
    }

    if (password === team.password) {
      if (user.team) {
        // delete user from current team's member list
        await this.teamModel.updateOne(
          { _id: user.team },
          {
            $pull: {
              members: {
                userId,
              },
            },
          },
        );
      }
      await this.teamModel.updateOne(
        { _id: teamId },
        { $push: { members: userId } },
      );
      await this.userModel.updateOne({ _id: userId }, { team: teamId });
      return { success: 'ok' };
    } else {
      throw new HttpException('Wrong password', HttpStatus.BAD_REQUEST);
    }
  }

  // Leave team by user
  async leave(teamId: string, userId: string) {
    const team = await this.teamModel.findOne({ _id: teamId });
    const user = await this.userModel.findOne({ _id: userId });

    if (!team) {
      throw new HttpException('Team not found', HttpStatus.BAD_REQUEST);
    }

    await this.teamModel.updateOne(
      { _id: teamId },
      { $pull: { members: userId } },
    );
    await this.userModel.updateOne({ _id: userId }, { team: null });
    return { success: 'ok' };
  }
}
