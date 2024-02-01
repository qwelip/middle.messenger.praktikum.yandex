import { IUserResponse } from './api-models'

export interface ISignIn {
  login: string
  password: string
}

export interface IUser extends IUserResponse {}
