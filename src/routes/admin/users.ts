import { UserHttpService } from "../../featured/users/infrastructure/user-http-service";
import { AuthorizationService } from "../../featured/shared/auth/authorization-service";
const userService = new UserHttpService(new AuthorizationService());
export const adminUsersRoutes = {
  path: "/users",
  children: [
    {
      path: "/",
      action: async () => {
        await import("../../featured/users/ui/admin-list");
        await userService.thisIsAdmin();
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
