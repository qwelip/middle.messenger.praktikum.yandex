import { registerComponent } from './core/resgiterComponent'
import { router } from './core/router'
import ChatListItemComponent from './pages/chat/components/chat-list-item/chat-list-item-component'
import { initApp } from './services/init-app'
import { Store, store } from './store/store'

declare global {
  interface Window {
    store: Store
  }
}

registerComponent('ChatListItemComponent', ChatListItemComponent, 'div')

window.store = store

document.addEventListener('DOMContentLoaded', async () => {
  router.start()
  await initApp()
})
