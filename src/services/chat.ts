import { ChatApi } from '../api/chat-api'
import {
  IGetChatUsersResponse,
  IGetChatsResponse,
  IHttpErrorResponse,
  INewChatResponse,
} from '../models/api-models'
import { IAddUsersToChat, IGetChats, INewChat } from '../models/data-models'

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

export const addUsersToChat = async (data: IAddUsersToChat) => {
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

export const getChatUsers = async (id: string) => {
  try {
    const response = await authApi.getChatUsers(id)
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
