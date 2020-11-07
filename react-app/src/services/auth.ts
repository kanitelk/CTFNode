import { LoginFormInput } from "../components/Auth/LoginForm";
import { RegisterFormInput } from "../components/Auth/RegisterForm";
import { http } from "./http";

export const register_new_user = async (
  data: RegisterFormInput
): Promise<{ login: string; token: string }> => {
  let res = await http.post(`/users`, data);
  return res.data;
};

export const login_user = async (data: LoginFormInput) => {
  let res = await http.post(`/users/login`, data);
  return res.data;
};
