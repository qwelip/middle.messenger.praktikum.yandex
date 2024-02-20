import { registerComponent } from './core/resgiterComponent'
import ChatListItemComponent from './pages/chat/components/chat-list-item/chat-list-item-component'
import { initApp } from './services/init-app'
import { Store, store } from './store/store'
import { RouterClass } from './core/router'
import LoginPage from './pages/login/login-page'
import ChatPage from './pages/chat/chat-page'
import ProfilePage from './pages/profile/profile-page'
import ChangeUserDataPage from './pages/change-user-data/change-user-data-page'
import ChangePasswordPage from './pages/change-password/change-password-page'
import Page500 from './pages/page-500/page-500-page'
import Page404 from './pages/page-404/page-404-page'
import SignInPage from './pages/sign-in/signIn-page'

declare global {
  interface Window {
    store: Store
  }
}

registerComponent('ChatListItemComponent', ChatListItemComponent, 'div')

window.store = store

// eslint-disable-next-line import/no-mutable-exports
export let router: RouterClass

document.addEventListener('DOMContentLoaded', async () => {
  router = new RouterClass('app')
  router.use('/', LoginPage)
  router.use('/messenger', ChatPage)
  router.use('/profile', ProfilePage)
  router.use('/settings', ChangeUserDataPage)
  router.use('/change-password', ChangePasswordPage)
  router.use('/sign-up', SignInPage)
  router.use('/page500', Page500)
  router.use('/page404', Page404)
  router.start()
  await initApp()
})
