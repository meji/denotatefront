import { catRoutes } from "./categories";
import { tagRoutes } from "./tags";
import { postsRoutes } from "./posts";
import { usersRoutes } from "./users";

export const publicRoute = {
  path: "/",
  action: async () => {
    await import("../../core/pages/public/public-container");
  },
  component: "container-c",
  children: [
    {
      path: "/",
      action: async () => {
        await import("../../core/pages/public/home");
      },
      component: "home-c"
    },
    {
      path: "/not-found",
      action: async () => {
        await import("../../core/pages/public/not-found");
      },
      component: "not-found"
    },
    tagRoutes,
    catRoutes,
    // usersRoutes,
    ...postsRoutes,
    {
      path: "/(.*)",
      action: async () => {
        await import("../../core/pages/public/not-found");
      },
      component: "not-found"
    }
  ]
};
