export class AuthorizationService {
  private readonly key = "auth-denotate-token";

  public isAuthorized(): Promise<boolean> {
    const token = this.getToken();

    return new Promise(resolve => {
      resolve(token != "undefined" && token != null);
    });
  }

  setToken(token: string): void {
    localStorage.setItem(this.key, token);
  }

  getToken(): string | null {
    return localStorage.getItem(this.key);
  }

  removeToken(): void {
    return localStorage.removeItem(this.key);
  }
}
