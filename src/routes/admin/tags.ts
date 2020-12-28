export const adminTagsRoutes = {
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
      path: "/new",
      action: async () => {
        await import("../../featured/tags/ui/new");
      },
      component: "tag-new-c"
    },
    {
      path: "/edit",
      action: async () => {
        await import("../../featured/tags/ui/edit");
      },
      component: "tag-form-c"
    }
  ]
};
