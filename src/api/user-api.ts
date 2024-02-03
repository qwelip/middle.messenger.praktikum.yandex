import { IChangePassword, IChangeProfile } from '../models/data-models'
import CustomFetch from './custom-fetch'

const authInstance = new CustomFetch('/user')

export class UserApi {
  async changeProfile(data: IChangeProfile): Promise<XMLHttpRequest> {
    return authInstance.put('/profile', {
      headers: {
        'Content-Type': 'application/json; charset=UTF-8',
      },
      data: JSON.stringify(data),
    })
  }
  async changePassword(data: IChangePassword): Promise<XMLHttpRequest> {
    return authInstance.put('/password', {
      headers: {
        'Content-Type': 'application/json; charset=UTF-8',
      },
      data: JSON.stringify(data),
    })
  }
  async changeAvatar(data: FormData): Promise<XMLHttpRequest> {
    return authInstance.put('/profile/avatar', {
      data,
    })
  }
}
