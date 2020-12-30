export const tagRoutes = {
  path: "/tag",
  action: async () => {
    await import("../../featured/tags/ui/home");
  },
  component: "tag-home-c"
};
