import { Commands, Context, Router } from '@vaadin/router'
import { AuthorizationService } from './authorization-service'
import { PageEnabled } from './page-enabled'
import { UserRepositoryFactory } from '../../users/infrastructure/user-repository-factory'
import { UserHttpService } from '../../users/infrastructure/user-http-service'
import { notify } from '../../../utils/utils'

export class AuthGuard implements PageEnabled {
  private userService: UserHttpService
  private userRepository = UserRepositoryFactory.build()
  constructor() {
    this.userService = new UserHttpService(new AuthorizationService())
  }
  public async pageEnabled(context: Context, commands: Commands): Promise<any> {
    const isAdmin = await this.userRepository.findAdmin()
    const isAuthenticated = await this.userService.thisIsLogged()
    if (!isAdmin) {
      console.warn('New  Site you need to configure your site')
      return commands.redirect('/newsite')
    } else if (!isAuthenticated) {
      console.warn('User not authorized', context.pathname)
      return Router.go('/login'), notify('error', 'No autorizado')
    }
    return undefined
  }
  public async pageAdminEnabled(context: Context): Promise<any> {
    const thisIsAdmin = await this.userService.thisIsAdmin()
    if (!thisIsAdmin) {
      console.warn('User not authorized', context.pathname)
      return Router.go('/login'), notify('error', 'No autorizado')
    }
    return undefined
  }
}
