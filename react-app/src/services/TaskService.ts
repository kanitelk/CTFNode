import { AxiosInstance } from "axios";
import { ITask } from "../store/tasks/types";
import { http } from "./http";

class TaskService {
  private _http: AxiosInstance;
  constructor(http: AxiosInstance) {
    this._http = http;
    console.log(http.interceptors);
    
  }

  getTaskById = async (id: string): Promise<ITask> => {
    return (await this._http.get(`/tasks/${id}`)).data;
  };

  getTasks = async (): Promise<ITask[]> => {
    return (await this._http.get(`/tasks`)).data;
  };

  getAllTasks = async (): Promise<ITask[]> => {
    return (await this._http.get(`/tasks/all`)).data;
  };

  editTask = async (_id: string, data: any): Promise<ITask> => {
    return (await this._http.put(`/tasks/${_id}`, data)).data;
  };

  sendFlag = async (taskId: string, flag: string): Promise<any> => {
    return (await this._http.post(`/flags/send`, { taskId, flag })).data;
  };

  getFlags = async (taskId: string): Promise<any> => {
    return this._http.get(`/tasks/${taskId}/flags`);
  };
}

export default new TaskService(http);
