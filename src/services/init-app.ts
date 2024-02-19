import { router } from '../main'
import { getUser } from './auth'
import { getChats } from './chat'

export const initApp = async () => {
  try {
    const user = await getUser()
    const chats = await getChats({
      offset: 0,
      limit: 100,
    })
    window.store.set('chats', chats)
    window.store.set('user', user)
  } catch (error) {
    router.go('/')
  }
}
