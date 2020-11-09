import { AxiosInstance } from "axios";
import { LoginFormInput } from "../components/Auth/LoginForm";
import { RegisterFormInput } from "../components/Auth/RegisterForm";
import { http } from "./http";

class AuthService {
  private _http: AxiosInstance;
  constructor(http: AxiosInstance) {
    this._http = http;
  }

  register_new_user = async (
    data: RegisterFormInput
  ): Promise<{ login: string; token: string }> => {
    let res = await this._http.post(`/users`, data);
    return res.data;
  };

  login_user = async (
    data: LoginFormInput
  ): Promise<{ login: string; token: string }> => {
    let res = await this._http.post(`/users/login`, data);
    return res.data;
  };
}

export default new AuthService(http);
