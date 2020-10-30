import { Injectable } from "@angular/core";
import { environment } from "../../environments/environment";
import { AuthService } from "./auth.service";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Task } from "../components/tasks/tasks-list/tasks-list.component";

@Injectable({
  providedIn: "root",
})
export class TaskService {
  private API_URL = environment.apiURL;

  constructor(private _authService: AuthService, private http: HttpClient) {}

  public getTask(id: string): Observable<any> {
    return this.http.get(`${this.API_URL}/tasks/${id}`);
  }

  public getTasks(): Observable<any> {
    return this.http.get(`${this.API_URL}/tasks/`);
  }

  public addTask(
    title: string,
    content: string,
    visible: boolean,
    flag: string,
    score: number
  ): Observable<any> {
    const data = {
      title,
      content,
      visible,
      flag,
      score,
    };
    return this.http.post(`${this.API_URL}/tasks/`, { data: data });
  }

  public editTask(
    _id: string,
    title: string,
    content: string,
    visible: boolean,
    flag: string,
    score: number
  ) {
    const data = {
      title,
      content,
      visible,
      flag,
      score,
    };
    return this.http.put(`${this.API_URL}/tasks/${_id}`, { data });
  }

  public sendFlag(taskId: string, flag: string) {
    return this.http.post(`${this.API_URL}/flags/send`, { taskId, flag });
  }

  public getFlags(taskId: string): Observable<any> {
    return this.http.get(`${this.API_URL}/tasks/${taskId}/flags`);
  }
}
