import { store } from '../store/store'
import { Route } from './route'

export class RouterClass {
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
