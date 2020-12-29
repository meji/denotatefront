export const tagRoutes = {
  path: "/tags",
  children: [
    {
      path: "/",
      action: async () => {
        await import("../../featured/tags/ui/list");
      },
      component: "tag-list-c"
    },
    {
      path: "/:tag",
      action: async () => {
        await import("../../featured/tags/ui/tag");
      },
      component: "tag-home-c"
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
