import ChangePasswordPage from '../pages/change-password/change-password-page'
import ChangeUserDataPage from '../pages/change-user-data/change-user-data-page'
import ChatPage from '../pages/chat/chat-page'
import LoginPage from '../pages/login/login-page'
import Page404 from '../pages/page-404/page-404-page'
import Page500 from '../pages/page-500/page-500-page'
import ProfilePage from '../pages/profile/profile-page'
import SignInPage from '../pages/sign-in/signIn-page'
import { store } from '../store/store'
import { Route } from './route'

export class Router {
  private _rootQuery: string
  routes: Route[] = []
  history: History | undefined
  private _currentRoute: Route | null

  constructor(rootQuery: string) {
    this.routes = []
    this.history = window.history
    this._currentRoute = null
    this._rootQuery = rootQuery
  }

  use(pathname: string, block: object) {
    const route = new Route(pathname, block, { rootQuery: this._rootQuery })
    this.routes.push(route)
    return this
  }

  start() {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    window.onpopstate = (event: any) => {
      const currentPath = event.currentTarget?.location.pathname
      const { user } = store.getState()
      if (!user) {
        this.go('/')
        return
      }
      if (user && (currentPath === '/' || currentPath === '/sign-up')) {
        this.go('/messenger')
        return
      }
      this._onRoute(currentPath)
    }
    this._onRoute(window.location.pathname)
  }

  _onRoute(pathname: string) {
    const route = this.getRoute(pathname)
    if (!route) {
      return
    }

    if (this._currentRoute) {
      this._currentRoute.leave()
    }
    this._currentRoute = route
    route.render()
  }

  go(pathname: string) {
    this.history?.pushState({}, '', pathname)
    this._onRoute(pathname)
  }

  back() {
    window.history.back()
  }

  forward() {
    window.history.forward()
  }

  getRoute(pathname: string) {
    return this.routes.find((route) => route.match(pathname))
  }
}

export const router = new Router('app')
router.use('/', LoginPage)
router.use('/messenger', ChatPage)
router.use('/profile', ProfilePage)
router.use('/settings', ChangeUserDataPage)
router.use('/change-password', ChangePasswordPage)
router.use('/sign-up', SignInPage)
router.use('/page500', Page500)
router.use('/page404', Page404)
