import { Router } from '@vaadin/router'
import { UserHttpService } from '../../featured/users/infrastructure/user-http-service'
import { AuthorizationService } from '../../featured/shared/auth/authorization-service'

export const otherRoutes = [
  {
    path: '/newsite',
    action: async () => {
      await import('../../featured/users/ui/first-user')
    },
    component: 'first-user-c'
  },
  {
    path: '/login',
    action: async () => {
      await import('../../featured/users/ui/login')
    },
    component: 'login-page-c'
  },
  {
    path: '/logout',
    action: async () => {
      const userHttpService = new UserHttpService(new AuthorizationService())
      await userHttpService.logout().then(() => Router.go('/'))
    },
    redirect: '/'
  },
  {
    path: '/',
    action: async () => {
      await import('../../featured/site/ui/home')
    },
    component: 'home-c'
  }
]
