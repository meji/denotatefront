import './denotate-front.js';
import { Router, Context, Commands } from '@vaadin/router';
import { AuthGuard } from './src/featured/shared/auth/auth-guard';
const routes = [
  {
    path: '/',
    component: 'denotate-front',
    children: [
      {
        path: '/:category',
        component: 'category-page',
        action: async () => {
          await import('./src/routes/public/category');
        },
        children: [
          {
            path: '/:post',
            component: 'post-page',
            action: async () => {
              await import('./src/routes/public/post');
            },
          },
        ],
      },
      {
        path: '/tag/:tag',
        component: 'tag-page',
        action: async () => {
          await import('./src/routes/public/tag');
        },
      },
    ],
  },
  {
    path: '/admin',
    component: 'admin-home',
    action: async (context: Context, commands: Commands) => {
      return await new AuthGuard().pageEnabled(context, commands, '/');
    },
  },
  { path: '(.*)', component: 'not-found' },
];

const outlet = document.getElementById('outlet');
export const router = new Router(outlet);
router.setRoutes(routes);
