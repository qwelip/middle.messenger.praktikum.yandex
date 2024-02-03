import { ResourcesApi } from '../api/resources-api'
import { IGetAvatarResponse, IHttpErrorResponse } from '../models/api-models'

const resourcesApi = new ResourcesApi()

export const getAvatar = async (path: string) => {
  try {
    const response = await resourcesApi.getAvatar(path)
    if (response.status === 200) {
      return response as IGetAvatarResponse
    }
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
