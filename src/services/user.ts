import { UserApi } from '../api/user-api'
import {
  IChageAvatarResponse,
  IChageProfileResponse,
  IHttpErrorResponse,
} from '../models/api-models'
import { IChangePassword, IChangeProfile } from '../models/data-models'

const userApi = new UserApi()

export const changeProfile = async (data: IChangeProfile) => {
  try {
    const response = await userApi.changeProfile(data)
    if (response.status === 200) {
      const res = JSON.parse(response?.response) as IChageProfileResponse
      window.store.set('profile', res)
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

export const changePassword = async (data: IChangePassword) => {
  try {
    const response = await userApi.changePassword(data)
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

export const changeAvatar = async (data: FormData) => {
  try {
    const response = await userApi.changeAvatar(data)
    if (response.status === 200) {
      return JSON.parse(response?.response) as IChageAvatarResponse
    }
    const msg = JSON.parse(response.response) as IHttpErrorResponse
    throw new Error(msg.reason)
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message)
    }
  }
}
