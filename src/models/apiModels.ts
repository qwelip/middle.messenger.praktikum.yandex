export interface IUserResponse {
  first_name: string
  second_name: string
  login: string
  email: string
  password: string
  phone: string
  avatar?: unknown
  display_name?: string
}

export interface IHttpErrorResponse {
  reason: string
}

// todom возможно не нужен
export interface ICreateUserResponse {
  id: number
}
