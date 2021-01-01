import {Commands, Context} from '@vaadin/router';
import {AuthGuard} from '../../featured/shared/auth/auth-guard';

export const adminUsersRoutes = {
  path: "/users",
  children: [
    {
      path: "/",
      action: async (context: Context, commands: Commands) => {
        await import("../../featured/users/ui/admin-list");
        await new AuthGuard().pageAdminEnabled(context, commands, "/");
      },
      component: "admin-user-list-c"
    },
    {
      path: "/new",
      action: async (context: Context, commands: Commands) => {
        await import("../../featured/users/ui/new");
        await new AuthGuard().pageAdminEnabled(context, commands, "/");
      },
      component: "user-new-c"
    },
    {
      path: "/edit",
      action: async (context: Context, commands: Commands) => {
        await import("../../featured/users/ui/edit");
        await new AuthGuard().pageAdminEnabled(context, commands, "/");
      },
      component: "user-form-c"
    }
  ]
};
