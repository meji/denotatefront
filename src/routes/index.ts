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
        action: async (context: Context, commands: Commands) => {
          import("../pages/admin/home");
          return await new AuthGuard().pageEnabled(context, commands, "/");
        },
        component: "admin-home"
      }
    ]
  },
  {
    path: "/",
    action: async () => {
      await import("../pages/public/container");
    },
    component: "container-c",
    children: [
      {
        path: "/",
        action: async () => {
          await import("../pages/public/home");
        },
        component: "home-component"
      },
      {
        path: "/newsite",
        action: async () => {
          await import("../pages/admin/new-site");
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
        action: async () => {
          await import("../pages/admin/login");
        },
        component: "login-page-c"
      },
      {
        path: "/tags",
        children: [
          {
            path: "/",
            action: async () => {
              await import("../pages/public/tag");
            },
            component: "tag-page-index"
          },
          {
            path: "/:tag",
            action: async () => {
              await import("../pages/public/tag");
            },
            component: "tag-page"
          },
          {
            path: "/(.*)",
            action: async () => {
              await import("../pages/public/not-found");
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
              await import("../pages/public/category");
            },
            component: "category-page"
          },
          {
            path: "/:post",
            action: async () => {
              await import("../pages/public/post");
            },
            component: "post-page"
          },
          {
            path: "/(.*)",
            action: async () => {
              await import("../pages/public/not-found");
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
      await import("../pages/public/not-found");
    },
    component: "not-found"
  }
];
