export class TokenStorage {
  // @ts-ignore
  public static get token(): string | null {
    return localStorage.getItem("token");
  }

  // @ts-ignore
  public static set token(token: string) {
    localStorage.setItem("token", token);
  }

  public static removeToken() {
    localStorage.removeItem("token");
  }
}
