// import { ICreateUserRes, IHttpError, IUser } from '../models/apiModels'
import CustomFetch from './customFetch'

const authInstance = new CustomFetch('/auth')

export interface INewUser {
  first_name: string
  second_name: string
  login: string
  email: string
  password: string
  phone: string
}

export interface ISignIn {
  login: string
  password: string
}

export class AuthApi {
  async me(): Promise<XMLHttpRequest> {
    return authInstance.get('/user')
  }
  async createUser(data: INewUser): Promise<XMLHttpRequest> {
    return authInstance.post('/signup', {
      headers: {
        'Content-Type': 'application/json; charset=UTF-8',
      },
      data: JSON.stringify(data),
    })
  }
  async signIn(data: ISignIn): Promise<XMLHttpRequest> {
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
