import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument, UserRole } from '../schema/User.schema';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/createUser.dto';
import * as bcrypt from 'bcryptjs';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>, // private authService: AuthService,
  ) {}

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
    // const authData = this.authService.login(createdUser);
    // return authData;
  }

  async findOneById(id: string) {
    const user = await this.userModel.findById(id);
    return user;
  }

  async findOneByLogin(login: string) {
    const user = await this.userModel.findOne({ login });
    return user;
  }

  async findAll() {
    const users = await this.userModel.find();
    return users;
  }

  // async updateUser() {}

  async deleteUser(id: string) {
    const deletedUser = this.userModel.deleteOne({ _id: id });
    return deletedUser;
  }
}
