export class AuthorizationService {
  private readonly key = 'token';

  public isAuthorized(): Promise<boolean> {
    const token = this.getToken();
    return new Promise(resolve => {
      resolve(token !== null);
      // resolve(true);
    });
  }

  setToken(token: string): void {
    localStorage.setItem(this.key, token);
  }

  getToken(): string | null {
    return localStorage.getItem(this.key);
  }
}
