export interface IUserResponse {
  avatar?: unknown
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
