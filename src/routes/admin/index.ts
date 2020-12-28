import { Commands, Context } from "@vaadin/router";
import { AuthGuard } from "../../featured/shared/auth/auth-guard";
import { adminCatsRoutes } from "./categories";
import { adminTagsRoutes } from "./tags";
import { adminPostsRoutes } from "./posts";
import { adminUsersRoutes } from "./users";

export const adminRoutes = {
  path: "/admin",
  action: async (context: Context, commands: Commands) => {
    import("../../pages/admin/container");
    return await new AuthGuard().pageEnabled(context, commands, "/");
  },
  component: "admin-container-c",
  children: [
    {
      path: "/",
      component: "admin-post-list-c",
      action: async () => {
        import("../../featured/posts/ui/admin-list");
      }
    },
    {
      path: "/update-site",
      action: async () => {
        await import("../../featured/site/ui/update-site");
      },
      component: "update-site-c"
    },
    adminCatsRoutes,
    adminTagsRoutes,
    adminPostsRoutes,
    adminUsersRoutes
  ]
};
