import {Commands, Context, Route, Router} from '@vaadin/router';
import './app';
import {AuthGuard} from './featured/shared/auth/auth-guard';
const routes: Route[] = [
  {
    path: '/',
    component: 'app-lit',
    action: async () => {
      await import('./app');
    },
    children: [
      {
        path: ':category',
        component: 'category-page',
        action: async () => {
          await import('./routes/public/category');
        },
        children: [
          {
            path: ':post',
            component: 'post-page',
            action: async () => {
              await import('./routes/public/post');
            },
          },
        ],
      },
      {
        path: 'tag/:tag',
        component: 'tag-page',
        action: async () => {
          await import('./routes/public/tag');
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
  {path: '(.*)', component: 'not-found'},
];

const outlet = document.getElementById('outlet');
export const router = new Router(outlet);
router.setRoutes(routes);
