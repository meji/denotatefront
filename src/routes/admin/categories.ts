import {Context} from '@vaadin/router';
import {AuthGuard} from '../../featured/shared/auth/auth-guard';

export const adminCatsRoutes = {
  path: '/categories',
  children: [
    {
      path: '/',
      action: async (context: Context) => {
        await import('../../featured/categories/ui/admin-list')
        await new AuthGuard().pageAdminEnabled(context)
      },
      component: 'admin-category-list-c'
    },
    {
      path: '/new',
      action: async (context: Context) => {
        await import('../../featured/categories/ui/new')
        await new AuthGuard().pageAdminEnabled(context)
      },
      component: 'category-new-c'
    },
    {
      path: '/edit',
      action: async (context: Context) => {
        await import('../../featured/categories/ui/edit')
        await new AuthGuard().pageAdminEnabled(context)
      },
      component: 'category-form-c'
    }
  ]
}
