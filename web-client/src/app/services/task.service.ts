import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {AuthService} from './auth.service';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private API_URL = environment.apiURL;

  constructor(private _authService: AuthService, private http: HttpClient) {
  }

  public getTask(id: string): Observable<any> {
    return this.http.get(`${this.API_URL}/tasks/${id}`);
  }

  public getTasks(): Observable<any> {
    return this.http.get(`${this.API_URL}/tasks/`);
  }

  public addTask(title: string, content: string, visible: boolean, answer: string): Observable<any> {
    return this.http.post(`${this.API_URL}/tasks/`, {title, content, visible, answer});
  }
}
