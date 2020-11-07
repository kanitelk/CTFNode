import { http } from "./http";

export interface ITask {
  _id: string;
  title: string;
  content?: string;
  visible?: boolean;
  categories?: string;
  images?: string[];
  files?: string[];
  flag?: string;
  answer?: string;
  score: number;
}

export const getTaskById = async (id: string): Promise<ITask> => {
  return (await http.get(`/tasks/${id}`)).data;
};

export const getTasks = async (): Promise<ITask[]> => {
  return (await http.get(`/tasks`)).data;
};

export const getAllTasks = async (): Promise<ITask[]> => {
  return (await http.get(`/tasks/all`)).data;
};

export const editTask = async (_id: string, data: any): Promise<ITask> => {
  return (await http.put(`/tasks/${_id}`, data)).data;
};

export const sendFlag = async (taskId: string, flag: string): Promise<any> => {
  return (await http.post(`/flags/send`, { taskId, flag })).data;
};

export const getFlags = async (taskId: string): Promise<any> => {
  return http.get(`/tasks/${taskId}/flags`);
};
