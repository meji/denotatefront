import { adminRoutes } from "./admin";
import { publicRoute } from "./public";
import { otherRoutes } from "./others";

export const routes = [
  {
    path: "/",
    action: async () => {
      await import("../app-lit");
    },
    component: "app-lit",
    children: [
      ...otherRoutes,
      adminRoutes,
      publicRoute,
      {
        path: "/",
        redirect: "/not-found"
      }
    ]
  }
];
