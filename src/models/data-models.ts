import { IUserResponse } from './api-models'

export interface ISignIn {
  login: string
  password: string
}

export interface IUser extends Omit<IUserResponse, 'id'> {}

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

export interface INewChat {
  title: string
}

export interface IAddUsersToChat {
  users: number[]
  chatId: number
}

export interface IGetChats {
  offset: number
  limit: number
  title?: string
}