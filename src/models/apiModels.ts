export interface IUser {
  id: number
  first_name: string
  second_name: string
  display_name: string
  phone: string
  login: string
  avatar: string
  email: string
}

export interface ICreateUserRes {
  id: number
}

export interface IHttpError {
  reason: string
}
