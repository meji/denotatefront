export const adminTagsRoutes = {
  path: "/tags",
  children: [
    {
      path: "/",
      action: async () => {
        await import("../../featured/tags/ui/admin.list");
      },
      component: "admin-tag-list-c"
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
