export const catRoutes = {
  path: "/categorias",
  children: [
    {
      path: "/",
      action: async () => {
        await import("../../featured/categories/ui/list");
      },
      component: "category-list-c"
    },
    {
      path: "/:category",
      action: async () => {
        await import("../../featured/categories/ui/home");
      },
      component: "category-home-c"
    },
    {
      path: "/(.*)",
      action: async () => {
        await import("../../pages/public/not-found");
      },
      component: "not-found"
    }
  ]
};
