import { IUserResponse } from './api-models'

export interface ISignIn {
  login: string
  password: string
}

export interface IUser extends IUserResponse {}

export interface IChangeProfile {
  first_name: string
  second_name: string
  display_name: string
  login: string
  email: string
  phone: string
}

export interface IChangePassword {
  oldPassword: string
  newPassword: string
}
