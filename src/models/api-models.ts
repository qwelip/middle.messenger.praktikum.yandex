export interface IUserResponse {
  avatar?: string
  display_name?: string
  email: string
  first_name: string
  login: string
  password: string
  phone: string
  second_name: string
}

export interface IHttpErrorResponse {
  reason: string
}

// todom возможно не нужен
export interface ICreateUserResponse {
  id: number
}

export interface IChageProfileResponse {
  avatar: string
  display_name: string
  email: string
  first_name: string
  id: number
  login: string
  phone: string
  second_name: string
}

export interface IChageAvatarResponse {
  id: number
  first_name: string
  second_name: string
  display_name: string
  phone: string
  login: string
  avatar: string
  email: string
}

export interface IGetAvatarResponse {
  responseURL: string
  [keys: string]: unknown
}
