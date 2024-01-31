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
// todom возможно не нужен
export interface ICreateUserRes {
  id: number
}

export interface IHttpError {
  reason: string
}
