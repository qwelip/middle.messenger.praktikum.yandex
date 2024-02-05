export interface IUserResponse {
  id: number
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

export interface INewChatResponse {
  id: number
}

export interface IGetChatUsersResponse {
  token: string
}

interface ILastMessage {
  user: Omit<IUserResponse, 'id'>
  time: string
  content: string
}

export interface IGetChatsResponse {
  id: number
  title: string
  avatar: string
  unread_count: number
  created_by: number
  last_message?: ILastMessage
}

export interface IChatsWithActive extends IGetChatsResponse {
  isSelected: boolean
}
