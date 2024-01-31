import { router } from './core/router'
import { initApp } from './services/initApp'
import { Store, store } from './store/store'

declare global {
  interface Window {
    store: Store
  }
}

window.store = store

document.addEventListener('DOMContentLoaded', async () => {
  router.start()
  await initApp()
  // console.log('window.store', window.store)
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
