import { IUserResponse } from './apiModels'

export interface ISignIn {
  login: string
  password: string
}

export interface IUser extends IUserResponse {}
