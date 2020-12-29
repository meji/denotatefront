import { Commands, Context, RedirectResult } from "@vaadin/router";
import { AuthorizationService } from "./authorization-service";
import { PageEnabled } from "./page-enabled";
import { SiteService } from "../../site/infrastructure/site-service";
import { UserRepository } from "../../users/domain/user-repository";
import { UserRepositoryFactory } from "../../users/infrastructure/user-repository-factory";

export class AuthGuard implements PageEnabled {
  private authService: AuthorizationService;
  private userRepository = UserRepositoryFactory.build();
  constructor() {
    this.authService = new AuthorizationService();
  }

  public async pageEnabled(
    context: Context,
    commands: Commands,
    pathRedirect?: string
  ): Promise<any> {
    const isAdmin = await this.userRepository.findAdmin();
    const isAuthenticated = await this.authService.isAuthorized();
    if (!isAdmin) {
      console.warn("New  Site you need to configure your site");
      return commands.redirect("/newsite");
    } else if (!isAuthenticated) {
      console.warn("User not authorized", context.pathname);
      return commands.redirect(pathRedirect ? pathRedirect : "/");
    }
    return undefined;
  }
}

export async function authGuard(context: Context, commands: Commands) {
  const isAuthenticated = await new AuthorizationService().isAuthorized();

  if (!isAuthenticated) {
    console.warn("User not authorized", context.pathname);
    return commands.redirect("/");
  }

  return undefined;
}
