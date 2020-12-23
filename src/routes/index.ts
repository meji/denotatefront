import { Commands, Context } from "@vaadin/router";
import { AuthGuard } from "../featured/shared/auth/auth-guard";
import { UserHttpService } from "../featured/users/infrastructure/user-http-service";
import { AuthorizationService } from "../featured/shared/auth/authorization-service";

export const routes = [
  {
    path: "/newsite",
    component: "new-site",
    action: async () => {
      import("./admin/new-site");
    }
  },
  {
    path: "/admin",
    component: "admin-home",
    action: async (context: Context, commands: Commands) => {
      import("./admin/home");
      return await new AuthGuard().pageEnabled(context, commands, "/");
    }
  },
  {
    path: "/logout",
    action: async (context: Context, commands: Commands) => {
      const userHttpService = new UserHttpService(new AuthorizationService());
      await userHttpService.logout().then(() => commands.redirect("/"));
    }
  },
  {
    path: "/login",
    action: async (context: Context, commands: Commands) => {
      const userHttpService = new UserHttpService(new AuthorizationService());
      await userHttpService
        .login({ login: "jmmeji", password: "1234" })
        .then(() => commands.redirect("/"));
    }
  },
  {
    path: "/",
    component: "denotate-front",
    action: () => {
      import("../DenotateFront");
    },
    children: [
      {
        path: "/:category",
        component: "category-page",
        action: () => {
          import("./public/category");
        },
        children: [
          {
            path: "/:post",
            component: "post-page",
            action: () => {
              import("./public/post");
            }
          }
        ]
      },
      {
        path: "/tag/:tag",
        component: "tag-page",
        action: () => {
          import("./public/tag");
        }
      },
      {
        path: "*",
        component: "not-found",
        action: () => {
          import("./public/not-found");
        }
      }
    ]
  },
  {
    path: "*",
    component: "not-found",
    action: () => {
      import("./public/not-found");
    }
  }
];
