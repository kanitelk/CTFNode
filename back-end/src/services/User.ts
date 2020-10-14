import bcrypt from "bcryptjs";

import { User, UserRole } from "../models/UserSchema";
import { HttpException } from "../utils/errorHandler";
import { generateToken } from "./Auth";

class UserService {
  async loginUser(
    login: string,
    password: string
  ): Promise<{ login: string; token: string }> {
    try {
      const user = await User.findOne({ login });
      const comparePassword = bcrypt.compareSync(password, user.password);
      if (!comparePassword) {
        throw new HttpException(401, "Wrong login or password");
      } else {
        return {
          login,
          token: generateToken(user._id, login, user.role),
        };
      }
    } catch (error) {
      throw new HttpException(401, "Wrong login or password");
    }
  }

  createUser = async (login: string, password: string, email?: string) => {
    let findUser = await User.findOne({ login });

    if (findUser) throw new HttpException(400, "User already exists");
    if (!password) throw new HttpException(400, "Password not provided");

    let role = "user";

    if ((await User.count({})) === 0) {
      role = "admin";
    }

    let user = new User({
      login,
      password: this.getPasswordHash(password),
      email,
      role,
    });

    try {
      await user.save();
      return {
        login,
        token: generateToken(user._id, user.login, user.role),
      };
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  editUser = async (
    _id: string,
    email: string,
    password: string | null,
    role: UserRole | null,
    isAdmin: boolean = false
  ) => {
    try {
      let user = await User.findById(_id);
      if (email) user.email = email;
      if (password) user.password = this.getPasswordHash(password);
      if (isAdmin && role) user.role = role;
      await user.save();
      return {
        login: user.login,
        email: user.email,
        role: user.role,
      };
    } catch (error) {
      throw error;
    }
  };

  getPasswordHash = (pass: string): string => {
    const salt = bcrypt.genSaltSync(10);
    return bcrypt.hashSync(pass, salt);
  };
}

export default new UserService();
