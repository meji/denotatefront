export class AuthorizationService {
  private readonly key = "auth-denotate-token";

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
