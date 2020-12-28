export const adminCatsRoutes = {
  path: "/categories",
  children: [
    {
      path: "/",
      action: async () => {
        await import("../../featured/categories/ui/list");
      },
      component: "category-list-c"
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
