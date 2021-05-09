import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { UserRole } from '../schema/User.schema';

export interface JwtPayloadUser {
  _id: string;
  login: string;
  role: UserRole;
}

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(
    login: string,
    password: string,
  ): Promise<JwtPayloadUser | null> {
    const user = await this.usersService.findOneByLogin(login);
    if (!user) return null;
    const passIsRight = await bcrypt.compare(password, user.password);
    if (passIsRight) {
      return {
        _id: user._id,
        login: user.login,
        role: user.role,
      };
    }
    return null;
  }

  async login(user: any) {
    const payload: JwtPayloadUser = {
      login: user.login,
      _id: user._id,
      role: user.role,
    };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
