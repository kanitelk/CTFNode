import { TaskFormInput } from "../components/Tasks/TaskForm";
import { http } from "./http";
import { ITaskListItem } from "../types/tasks";

export const getTaskById = async (id: string): Promise<ITaskListItem> => {
  return (await http.get(`/tasks/${id}`)).data;
};

export const getTasks = async (): Promise<ITaskListItem[]> => {
  return (await http.get(`/tasks`)).data;
};

export const getAllTasks = async (): Promise<ITaskListItem[]> => {
  return (await http.get(`/tasks/all`)).data;
};

export const addTask = async (task: TaskFormInput): Promise<ITaskListItem> => {
  return (await http.post(`/tasks`, { data: task })).data;
};

export const editTask = async (
  _id: string,
  data: TaskFormInput
): Promise<ITaskListItem> => {
  return (await http.put(`/tasks/${_id}`, { data })).data;
};

export const sendFlag = async (params: {
  taskId: string;
  flag: string;
}): Promise<any> => {
  return (
    await http.post(`/flags/send`, { taskId: params.taskId, flag: params.flag })
  ).data;
};

export const getFlags = async (taskId: string): Promise<any> => {
  return http.get(`/tasks/${taskId}/flags`);
};
