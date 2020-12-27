import { Commands, Context } from "@vaadin/router";
import { AuthGuard } from "../featured/shared/auth/auth-guard";
import { UserHttpService } from "../featured/users/infrastructure/user-http-service";
import { AuthorizationService } from "../featured/shared/auth/authorization-service";

export const routes = [
  {
    path: "/",
    action: async () => {
      await import("../app-lit");
    },
    component: "app-lit",
    children: [
      {
        path: "/admin",
        action: async (context: Context, commands: Commands) => {
          import("../pages/admin/container");
          return await new AuthGuard().pageEnabled(context, commands, "/");
        },
        component: "admin-container-c",
        children: [
          {
            path: "/",
            component: "admin-posts-c",
            action: async () => {
              import("../pages/admin/posts");
            }
          },
          {
            path: "/update-site",
            action: async () => {
              await import("../featured/site/ui/update-site");
            },
            component: "update-site-c"
          },
          {
            path: "/categories",
            children: [
              {
                path: "/",
                action: async () => {
                  await import("../featured/categories/ui/list");
                },
                component: "category-list-c"
              },
              {
                path: "/new",
                action: async () => {
                  await import("../featured/categories/ui/new");
                },
                component: "category-new-c"
              },
              {
                path: "/edit",
                action: async () => {
                  await import("../featured/categories/ui/form");
                },
                component: "category-form-c"
              }
            ]
          },
          {
            path: "/tags",
            children: [
              {
                path: "/",
                action: async () => {
                  await import("../featured/tags/ui/list");
                },
                component: "tag-list-c"
              },
              {
                path: "/new",
                action: async () => {
                  await import("../featured/tags/ui/new");
                },
                component: "tag-new-c"
              },
              {
                path: "/edit",
                action: async () => {
                  await import("../featured/tags/ui/form");
                },
                component: "tag-form-c"
              }
            ]
          },
          {
            path: "/posts",
            children: [
              {
                path: "/",
                action: async () => {
                  await import("../featured/posts/ui/list");
                },
                component: "post-list-c"
              },
              {
                path: "/:category",
                action: async () => {
                  await import("../featured/posts/ui/form");
                },
                component: "post-form-c"
              }
            ]
          }
        ]
      },
      {
        path: "/newsite",
        action: async () => {
          await import("../featured/site/ui/new-site");
        },
        component: "new-site"
      },
      {
        path: "/login",
        action: async () => {
          await import("../featured/users/ui/login");
        },
        component: "login-page-c"
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
        path: "/",
        action: async () => {
          await import("../pages/public/container");
        },
        component: "container-c",
        children: [
          {
            path: "/tags",
            children: [
              {
                path: "/",
                action: async () => {
                  await import("../featured/tags/ui/list");
                },
                component: "tag-list-c"
              },
              {
                path: "/:tag",
                action: async () => {
                  await import("../featured/tags/ui/tag");
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
        path: "/(.*)",
        action: async () => {
          await import("../pages/public/not-found");
        },
        component: "not-found"
      }
    ]
  }
];
