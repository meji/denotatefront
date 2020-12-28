export const postsRoutes = [
  {
    path: "/:post",
    action: async () => {
      await import("../../featured/posts/ui/home");
    },
    component: "post-home-c"
  }
];
