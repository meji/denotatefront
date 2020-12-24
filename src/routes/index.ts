import { Commands, Context } from "@vaadin/router";
import { AuthGuard } from "../featured/shared/auth/auth-guard";
import { UserHttpService } from "../featured/users/infrastructure/user-http-service";
import { AuthorizationService } from "../featured/shared/auth/authorization-service";

export const routes = [
  {
    path: "/admin",
    children: [
      {
        path: "/",
        component: "admin-home",
        action: async (context: Context, commands: Commands) => {
          import("./admin/home");
          return await new AuthGuard().pageEnabled(context, commands, "/");
        }
      }
    ]
  },
  {
    path: "/",
    children: [
      {
        path: "/",
        action: async () => {
          await import("../app-lit");
        },
        component: "app-lit"
      },
      {
        path: "/newsite",
        action: async () => {
          await import("./admin/new-site");
        },
        component: "new-site"
      },
      {
        path: "/logout",
        action: async (context: Context, commands: Commands) => {
          const userHttpService = new UserHttpService(
            new AuthorizationService()
          );
          await userHttpService.logout().then(() => commands.redirect("/"));
        },
        redirect: "/"
      },
      {
        path: "/login",
        action: async (context: Context, commands: Commands) => {
          const userHttpService = new UserHttpService(
            new AuthorizationService()
          );
          await userHttpService.login({ login: "jmmeji", password: "1234" });
        },
        redirect: "/"
      },
      {
        path: "/tags",
        children: [
          {
            path: "/",
            action: async () => {
              await import("./public/tag");
            },
            component: "tag-page-index"
          },
          {
            path: "/:tag",
            action: async () => {
              await import("./public/tag");
            },
            component: "tag-page"
          },
          {
            path: "/(.*)",
            action: async () => {
              await import("./public/not-found");
            },
            component: "not-found"
          }
        ]
      },
      {
        path: "/:category",
        children: [
          {
            path: "/",
            action: async () => {
              await import("./public/category");
            },
            component: "category-page"
          },
          {
            path: "/:post",
            action: async () => {
              await import("./public/post");
            },
            component: "post-page"
          },
          {
            path: "/(.*)",
            action: async () => {
              await import("./public/not-found");
            },
            component: "not-found"
          }
        ]
      }
    ]
  },
  {
    path: "/(.*)",
    action: async () => {
      await import("./public/not-found");
    },
    component: "not-found"
  }
];
