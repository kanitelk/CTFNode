import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from '../schema/User.schema';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/createUser.dto';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async createUser(createUserDto: CreateUserDto) {
    const createdUser = new this.userModel(createUserDto);
    await createdUser.save();
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

  async updateUser() {}

  async deleteUser(id: string) {
    const deletedUser = this.userModel.deleteOne({ _id: id });
    return deletedUser;
  }
}
