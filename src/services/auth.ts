import { AuthApi, INewUser } from '../api/authApi'
import { IHttpError } from '../api/models'

const authApi = new AuthApi()
// todom обрабатывать статусы
export const getUser = async () => {
  try {
    return await authApi.me()
  } catch (error) {
    console.log('error', error)
  }
}

export const createUser = async (data: INewUser) => {
  try {
    const response = await authApi.createUser(data)
    if (response.status === 200) {
      const me = await getUser()
      window.store.set('user', me)
    } else {
      const msg = JSON.parse(response.response) as IHttpError
      throw new Error(msg.reason)
    }
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message)
    }
  }
}
