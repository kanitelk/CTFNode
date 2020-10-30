import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../../environments/environment";
import { BehaviorSubject, Observable } from "rxjs";
import { JwtHelperService } from "@auth0/angular-jwt";
import { Router } from "@angular/router";

export enum UserRole {
  user = "user",
  admin = "admin",
}

@Injectable({
  providedIn: "root",
})
export class AuthService {
  public isAuth = new BehaviorSubject<boolean>(false);
  public isAdmin = new BehaviorSubject<boolean>(false);
  public userLogin: string | null;
  public userId: string | null;
  public userRole: UserRole | null;
  private API_URL = environment.apiURL;
  private helper = new JwtHelperService();

  constructor(private http: HttpClient, private _router: Router) {
    const token = localStorage.getItem("token");
    if (token && !this.helper.isTokenExpired(token)) {
      this.setAuthToken(token);
    } else {
      this._router.navigate(["/login"]);
    }
  }

  public setAuthToken(token: string) {
    const { _id, login, role } = this.helper.decodeToken(token);
    this.isAuth.next(true);
    this.userId = _id;
    this.userLogin = login;
    this.userRole = role;
    if (role === "admin") {
      this.isAdmin.next(true);
    }
    localStorage.setItem("token", token);
  }

  public getAuthToken(): string {
    return localStorage.getItem("token");
  }

  public logout(): void {
    this.isAuth.next(false);
    this.userId = null;
    this.userLogin = null;
    this.userRole = null;
    this.isAdmin.next(false);
    localStorage.removeItem("token");
    this._router.navigate(["/"]);
  }

  public register(
    login: string,
    email: string,
    password: string
  ): Observable<any> {
    return this.http.post(`${this.API_URL}/users`, { email, login, password });
  }

  public login(login: string, password: string): Observable<any> {
    return this.http.post(`${this.API_URL}/users/login`, { login, password });
  }
}
