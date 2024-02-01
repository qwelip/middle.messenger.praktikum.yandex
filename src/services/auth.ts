import { AuthApi } from '../api/auth-api'
import { IHttpErrorResponse, IUserResponse } from '../models/api-models'
import { ISignIn, IUser } from '../models/data-models'

const authApi = new AuthApi()

export const getUser = async () => {
  try {
    const response = await authApi.me()
    if (response.status === 200) {
      return JSON.parse(response?.response) as IUserResponse
    }
    const msg = JSON.parse(response.response) as IHttpErrorResponse
    throw new Error(msg.reason)
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message)
    }
  }
}

export const createUser = async (data: IUser) => {
  try {
    const response = await authApi.createUser(data)
    if (response.status === 200) {
      const me = await getUser()
      window.store.set('user', me)
    } else {
      const msg = JSON.parse(response.response) as IHttpErrorResponse
      throw new Error(msg.reason)
    }
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message)
    }
  }
}

export const logout = async () => {
  try {
    const response = await authApi.logout()
    if (response.status !== 200) {
      const msg = JSON.parse(response.response) as IHttpErrorResponse
      throw new Error(msg.reason)
    }
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message)
    }
  }
}

export const login = async (data: ISignIn) => {
  try {
    const response = await authApi.login(data)
    if (response.status === 200) {
      const me = await getUser()
      window.store.set('user', me)
    } else {
      const msg = JSON.parse(response.response) as IHttpErrorResponse
      throw new Error(msg.reason)
    }
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message)
    }
  }
}
