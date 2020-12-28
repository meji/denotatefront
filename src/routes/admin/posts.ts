export const adminPostsRoutes = {
  path: "/posts",
  children: [
    {
      path: "/",
      action: async () => {
        await import("../../featured/posts/ui/admin-list");
      },
      component: "admin-post-list-c"
    },
    {
      path: "/new",
      action: async () => {
        await import("../../featured/posts/ui/new");
      },
      component: "post-new-c"
    },
    {
      path: "/edit",
      action: async () => {
        await import("../../featured/posts/ui/edit");
      },
      component: "post-form-c"
    }
  ]
};
