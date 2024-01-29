// import images from './utils/import-img'
// import { addOpenPopupHandle } from './utils/utils'
// import LoginPage from './pages/login/login-page'
// import SignInPage from './pages/sign-in/signIn-page'
// import ProfilePage from './pages/profile/profile-page'
// import ChangeUserDataPage from './pages/change-user-data/change-user-data-page'
// import ChangePasswordPage from './pages/change-password/change-password-page'
// import ChatPage from './pages/chat/chat-page'
// import Page500 from './pages/page-500/page-500-page'
// import Page404 from './pages/page-404/page-404-page'
import { router } from './core/router'

// export const pages = {
//   chatPage: new ChatPage(),
//   profilePage: new ProfilePage({ isPopupShow: false }),
//   changeUserDataPage: new ChangeUserDataPage(),
//   changePasswordPage: new ChangePasswordPage(),
//   // loginPage: new LoginPage(),
//   signInPage: new SignInPage(),
//   page500: new Page500(),
//   page404: new Page404(),
// }

// export function navigate(page: keyof typeof pages) {
//   const container = document.getElementById('app')!
//   const child = container.firstChild
//   const content = pages[page]
//   if (child) {
//     container.removeChild(child)
//     container.append(content.getContent()!)
//     return
//   }
//   container.append(content.getContent()!)
// }

document.addEventListener('DOMContentLoaded', () => {
  router.start()
  // const router = new Router('app')
  // router.use('/', LoginPage).start()
  // navigate('chatPage')

  // todom перенести функции для открытия попапов
  // addOpenPopupHandle('dialog-sender__pin-img', 'popup-dialog-sender', images.pinIcon, images.pinIconActive)
  // addOpenPopupHandle('dialog-header__btn-img', 'popup-dialog-header', images.contextMenuIcon, images.contextMenuIconActive)
})

// document.addEventListener('click', (e) => {
// const event = e.target as HTMLElement
// const page = event.getAttribute('page') as keyof typeof pages | null
// if (page) {
//   navigate(page)
//   e.preventDefault()
//   e.stopImmediatePropagation()
// }
// })
