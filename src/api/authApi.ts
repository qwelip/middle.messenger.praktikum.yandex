import { ICreateUserRes, IHttpError, IUser } from '../models/apiModels'
import CustomFetch from './customFetch'

const authInstance = new CustomFetch('/auth')

type INewUser = {
  first_name: string
  second_name: string
  login: string
  email: string
  password: string
  phone: string
}

interface ISignIn {
  login: string
  password: string
}

export class AuthApi {
  async me(): Promise<IUser | IHttpError> {
    return authInstance.get('/user')
  }
  async createUser(data: INewUser): Promise<ICreateUserRes | IHttpError> {
    return authInstance.post('/signup', {
      headers: {
        'Content-Type': 'application/json; charset=UTF-8',
      },
      data: JSON.stringify(data),
    })
  }
  async signIn(data: ISignIn): Promise<string | IHttpError> {
    return authInstance.post('/signin', {
      headers: {
        'Content-Type': 'application/json; charset=UTF-8',
      },
      data: JSON.stringify(data),
    })
  }
  async logout(): Promise<string> {
    return authInstance.post('/logout')
  }
}
