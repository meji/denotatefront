import {Context} from '@vaadin/router';
import {AuthGuard} from '../../featured/shared/auth/auth-guard';

export const adminUsersRoutes = {
  path: '/users',
  children: [
    {
      path: '/',
      action: async (context: Context) => {
        await import('../../featured/users/ui/admin-list')
        await new AuthGuard().pageAdminEnabled(context)
      },
      component: 'admin-user-list-c'
    },
    {
      path: '/new',
      action: async (context: Context) => {
        await import('../../featured/users/ui/new')
        await new AuthGuard().pageAdminEnabled(context)
      },
      component: 'user-new-c'
    },
    {
      path: '/edit',
      action: async (context: Context) => {
        await import('../../featured/users/ui/edit')
        await new AuthGuard().pageAdminEnabled(context)
      },
      component: 'user-form-c'
    }
  ]
}
