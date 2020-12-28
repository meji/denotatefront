import { catRoutes } from "./categories";
import { tagRoutes } from "./tags";
import { postsRoutes } from "./posts";
import { usersRoutes } from "./users";

export const publicRoute = {
  path: "/",
  action: async () => {
    await import("../../core/components/containers/public-container");
  },
  component: "container-c",
  children: [
    {
      path: "/",
      action: async () => {
        await import("../../pages/public/home");
      },
      component: "home-c"
    },
    catRoutes,
    tagRoutes,
    // usersRoutes,
    ...postsRoutes,
    {
      path: "/(.*)",
      action: async () => {
        await import("../../pages/public/not-found");
      },
      component: "not-found"
    }
  ]
};
