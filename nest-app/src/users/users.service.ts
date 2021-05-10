import {
  ForbiddenException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument, UserRole } from '../schema/User.schema';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/createUser.dto';
import * as bcrypt from 'bcryptjs';
import { UpdateUserDto } from './dto/updateUser.dto';
import { JwtPayloadUser } from '../auth/auth.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>, // private authService: AuthService,
  ) {}

  private userProjection: { [key in keyof User]?: number } = {
    login: 1,
    team: 1,
    score: 1,
  };

  async createUser(user: CreateUserDto) {
    const exists = await this.userModel.findOne({ login: user.login });

    if (exists) {
      throw new HttpException('User already exists', HttpStatus.BAD_REQUEST);
    }

    const salt = bcrypt.genSaltSync(6);
    user.password = bcrypt.hashSync(user.password, salt);

    let role = UserRole.USER;

    const usersCount = await this.userModel.count({});
    if (usersCount === 0) {
      role = UserRole.ADMIN;
    }
    const createdUser = new this.userModel({ ...user, role });
    await createdUser.save();
    return createdUser;
    // const authData = this.authService.login(createdUser);
    // return authData;
  }

  async findOneById(id: string) {
    return this.userModel.findById(id, this.userProjection);
  }

  async findOneByLogin(login: string) {
    return this.userModel.findOne({ login }, this.userProjection);
  }

  async findAll() {
    return this.userModel.find({}, this.userProjection);
  }

  async updateUser(id: string, data: UpdateUserDto, user: JwtPayloadUser) {
    if (user.role !== UserRole.ADMIN && id !== user._id) {
      throw new HttpException('Access denied', HttpStatus.FORBIDDEN);
    }
    if (data.password) {
      const salt = bcrypt.genSaltSync(6);
      data.password = bcrypt.hashSync(data.password, salt);
    }
    return this.userModel.findOneAndUpdate({ _id: id }, user, {
      new: true,
      projection: this.userProjection,
    });
  }

  async deleteUser(id: string) {
    return this.userModel.deleteOne({ _id: id });
  }
}
