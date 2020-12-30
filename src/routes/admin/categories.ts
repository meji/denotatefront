import { Commands, Context } from "@vaadin/router";
import { UserHttpService } from "../../featured/users/infrastructure/user-http-service";
import { AuthorizationService } from "../../featured/shared/auth/authorization-service";
import { AuthGuard } from "../../featured/shared/auth/auth-guard";
export const adminCatsRoutes = {
  path: "/categories",
  children: [
    {
      path: "/",
      action: async (context: Context, commands: Commands) => {
        await import("../../featured/categories/ui/admin-list");
        return await new AuthGuard().pageAdminEnabled(context, commands, "/");
      },
      component: "admin-category-list-c"
    },
    {
      path: "/new",
      action: async () => {
        await import("../../featured/categories/ui/new");
      },
      component: "category-new-c"
    },
    {
      path: "/edit",
      action: async () => {
        await import("../../featured/categories/ui/edit");
      },
      component: "category-form-c"
    }
  ]
};
