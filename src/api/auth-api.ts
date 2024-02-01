import { ISignIn, IUser } from '../models/data-models'
import CustomFetch from './custom-fetch'

const authInstance = new CustomFetch('/auth')

export class AuthApi {
  async me(): Promise<XMLHttpRequest> {
    return authInstance.get('/user')
  }
  async createUser(data: IUser): Promise<XMLHttpRequest> {
    return authInstance.post('/signup', {
      headers: {
        'Content-Type': 'application/json; charset=UTF-8',
      },
      data: JSON.stringify(data),
    })
  }
  async login(data: ISignIn): Promise<XMLHttpRequest> {
    return authInstance.post('/signin', {
      headers: {
        'Content-Type': 'application/json; charset=UTF-8',
      },
      data: JSON.stringify(data),
    })
  }
  async logout(): Promise<XMLHttpRequest> {
    return authInstance.post('/logout')
  }
}
