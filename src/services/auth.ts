import { AuthApi } from '../api/authApi'

const authApi = new AuthApi()

export const getUser = async () => {
  try {
    const user = await authApi.me()
    return user
  } catch (error) {
    console.log('error', error)
  }
}
