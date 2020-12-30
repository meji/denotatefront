import { UserHttpService } from "../../featured/users/infrastructure/user-http-service";
import { AuthorizationService } from "../../featured/shared/auth/authorization-service";
const userService = new UserHttpService(new AuthorizationService());
export const adminCatsRoutes = {
  path: "/categories",
  children: [
    {
      path: "/",
      action: async () => {
        await import("../../featured/categories/ui/admin-list");
        await userService.thisIsAdmin();
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
