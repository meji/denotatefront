export const adminCatsRoutes = {
  path: "/categories",
  children: [
    {
      path: "/",
      action: async () => {
        await import("../../featured/categories/ui/admin-list");
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
