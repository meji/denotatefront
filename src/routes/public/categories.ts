export const catRoutes = {
  path: "/categorias",
  children: [
    {
      path: "/",
      redirect: "/"
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
        await import("../../core/pages/public/not-found");
      },
      component: "not-found"
    }
  ]
};
