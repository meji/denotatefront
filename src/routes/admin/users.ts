import { UserHttpService } from "../../featured/users/infrastructure/user-http-service";
import { AuthorizationService } from "../../featured/shared/auth/authorization-service";
import { Commands, Context } from "@vaadin/router";
import { AuthGuard } from "../../featured/shared/auth/auth-guard";
const userService = new UserHttpService(new AuthorizationService());
export const adminUsersRoutes = {
  path: "/users",
  children: [
    {
      path: "/",
      action: async (context: Context, commands: Commands) => {
        await import("../../featured/users/ui/admin-list");
        return await new AuthGuard().pageAdminEnabled(context, commands, "/");
      },
      component: "admin-user-list-c"
    },
    {
      path: "/new",
      action: async () => {
        await import("../../featured/users/ui/new");
      },
      component: "user-new-c"
    },
    {
      path: "/edit",
      action: async () => {
        await import("../../featured/users/ui/edit");
      },
      component: "user-form-c"
    }
  ]
};
