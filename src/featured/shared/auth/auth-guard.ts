import { Commands, Context, RedirectResult } from "@vaadin/router";
import { AuthorizationService } from "./authorization-service";
import { PageEnabled } from "./page-enabled";
import { SiteService } from "../../site/infrastructure/site-service";

export class AuthGuard implements PageEnabled {
  private authService: AuthorizationService;
  private siteService: SiteService;

  constructor() {
    this.authService = new AuthorizationService();
    this.siteService = new SiteService();
  }

  public async pageEnabled(
    context: Context,
    commands: Commands,
    pathRedirect?: string
  ): Promise<RedirectResult | undefined> {
    const isAuthenticated = await this.authService.isAuthorized();
    if (
      (await this.siteService.getSite()) &&
      (await this.siteService.getSite()).new
    ) {
      console.warn(
        "New  Site you need to configure your site",
        context.pathname
      );
      return commands.redirect("/newsite");
    }
    if (!isAuthenticated) {
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
