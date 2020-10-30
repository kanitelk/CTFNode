import { Injectable } from "@angular/core";
import { environment } from "../../../environments/environment";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { UserRole } from "../AuthService/auth.service";

export type User = {
  _id: string;
  login: string;
  email?: string;
  score?: number;
  role: UserRole;
  createdAt: Date;
};

// In profile
export type SolveItem = {
  _id: string;
  task: {
    _id: string;
    title: string;
    score: number;
  };
  createdAt: Date;
};

// In tasks
export type UsersSolveItem = {
  _id: string,
  user: {
    _id: string,
    login: string,
    score: number
  },
  createdAt: Date
}

@Injectable({
  providedIn: "root",
})
export class UserService {
  private API_URL = environment.apiURL;

  constructor(private http: HttpClient) {}

  public getUser(user_id: string) {
    return this.http.get(`${this.API_URL}/users/${user_id}`);
  }

  /**
   *  Get user solves for all tasks
   * @param  {string} user_id
   */
  public getAllUserSolves(user_id: string) {
    return this.http.get(`${this.API_URL}/flags/${user_id}`);
  }

  /**
   *  Get users solves for one tasl
   * @param  {string} task_id
   */
  public getUserSolvesForTask(task_id: string) {
    return this.http.get(`${this.API_URL}/tasks/${task_id}/solves`);
  }
}
