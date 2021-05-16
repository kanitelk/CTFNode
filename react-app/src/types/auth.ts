export enum UserRole {
  ADMIN = "ADMIN",
  USER = "USER",
  SUSPENDED = "SUSPENDED",
}

export interface SessionUser {
  _id: string;
  login: string;
  role: UserRole;
}
