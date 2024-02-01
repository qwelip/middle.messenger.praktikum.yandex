import { router } from '../core/router'
import { getUser } from './auth'

export const initApp = async () => {
  console.log('initApp')
  try {
    const user = await getUser()
    window.store.set('user', user)
  } catch (error) {
    router.go('/')
  }
}
