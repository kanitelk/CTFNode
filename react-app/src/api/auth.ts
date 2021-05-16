import { LoginFormInput } from "../components/Auth/LoginForm";
import { RegisterFormInput } from "../components/Auth/RegisterForm";
import { http } from "./http";

export const register_new_user = async (
  data: RegisterFormInput
): Promise<any> => {
  let res = await http.post(`/users`, data);
  return res.data;
};

export const login_user = async (
  data: LoginFormInput
): Promise<{ access_token: string }> => {
  let res = await http.post(`/auth/login`, data);
  return res.data;
};
