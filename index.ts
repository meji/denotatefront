import { Router, Context, Commands } from "@vaadin/router";
import { AuthGuard } from "./src/featured/shared/auth/auth-guard";
const routes = [
  {
    path: "/admin",
    component: "admin-home",
    action: async (context: Context, commands: Commands) => {
      import("./src/routes/admin/home");
      return await new AuthGuard().pageEnabled(context, commands, "/");
    }
  },
  {
    path: "/",
    component: "denotate-front",
    action: () => {
      import("./denotate-front");
    },
    children: [
      {
        path: "/:category",
        component: "category-page",
        action: () => {
          import("./src/routes/public/category");
        },
        children: [
          {
            path: "/:post",
            component: "post-page",
            action: () => {
              import("./src/routes/public/post");
            }
          }
        ]
      },
      {
        path: "/tag/:tag",
        component: "tag-page",
        action: () => {
          import("./src/routes/public/tag");
        }
      },
      {
        path: "*",
        component: "not-found",
        action: () => {
          import("./src/routes/public/not-found");
        }
      }
    ]
  },
  {
    path: "*",
    component: "not-found",
    action: () => {
      import("./src/routes/public/not-found");
    }
  }
];

const outlet = document.getElementById("outlet");
export const router = new Router(outlet);
router.setRoutes(routes);
