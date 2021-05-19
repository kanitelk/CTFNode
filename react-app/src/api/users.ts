import { http } from "./http";

export const fetch_profile = async (): Promise<any> => {
  let res = await http.get(`/users/profile`);
  return res.data;
};
