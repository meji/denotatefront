import {catRoutes} from './categories';
import {tagRoutes} from './tags';
import {postsRoutes} from './posts';
import {setTitleDescription} from '../../utils/utils';

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
        setTitleDescription(
          "Denotate CMS",
          "Denotate, un CMS construido con Deno, LitElemente y Webcomponents"
        );
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
