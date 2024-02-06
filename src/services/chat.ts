import { ChatApi } from '../api/chat-api'
import {
  IChatUsersResponse,
  IGetChatUsersResponse,
  IGetChatsResponse,
  IHttpErrorResponse,
  INewChatResponse,
} from '../models/api-models'
import { IUsersChatMap, IGetChats, INewChat } from '../models/data-models'

const authApi = new ChatApi()

export const createChat = async (data: INewChat) => {
  try {
    const response = await authApi.createChat(data)
    if (response.status === 200) {
      return JSON.parse(response?.response) as INewChatResponse
    }
    const msg = JSON.parse(response.response) as IHttpErrorResponse
    throw new Error(msg.reason)
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message)
    }
  }
}

export const addUsersToChat = async (data: IUsersChatMap) => {
  try {
    const response = await authApi.addUsersToChat(data)
    if (response.status !== 200) {
      const msg = JSON.parse(response.response) as IHttpErrorResponse
      throw new Error(msg.reason)
    }
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message)
    }
  }
}

export const getToken = async (id: string) => {
  try {
    const response = await authApi.getToken(id)
    if (response.status === 200) {
      return JSON.parse(response?.response) as IGetChatUsersResponse
    }
    const msg = JSON.parse(response.response) as IHttpErrorResponse
    throw new Error(msg.reason)
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message)
    }
  }
}

export const getChats = async (data: IGetChats) => {
  try {
    const response = await authApi.getChats(data)
    if (response.status === 200) {
      return JSON.parse(response?.response) as IGetChatsResponse[]
    }
    const msg = JSON.parse(response.response) as IHttpErrorResponse
    throw new Error(msg.reason)
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message)
    }
  }
}

export const deleteUserFromChat = async (data: IUsersChatMap) => {
  try {
    const response = await authApi.deleteUserFromChat(data)
    if (response.status !== 200) {
      const msg = JSON.parse(response.response) as IHttpErrorResponse
      throw new Error(msg.reason)
    }
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message)
    }
  }
}

export const getChatUsers = async (data: { id: number }) => {
  try {
    const response = await authApi.getChatUser(data)
    if (response.status === 200) {
      return JSON.parse(response?.response) as IChatUsersResponse[]
    }
    const msg = JSON.parse(response.response) as IHttpErrorResponse
    throw new Error(msg.reason)
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message)
    }
  }
}
