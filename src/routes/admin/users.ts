export const adminUsersRoutes = {
  path: "/users",
  children: [
    {
      path: "/",
      action: async () => {
        await import("../../featured/users/ui/admin-list");
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
