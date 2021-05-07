import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.usersService.findOneByLogin(username);
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
    const payload = { username: user.login, _id: user._id, role: user.role };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
