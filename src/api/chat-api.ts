import { IUsersChatMap, IGetChats, INewChat } from '../models/data-models'
import CustomFetch from './custom-fetch'

const authInstance = new CustomFetch('/chats')

export class ChatApi {
  async createChat(data: INewChat): Promise<XMLHttpRequest> {
    return authInstance.post('', {
      headers: {
        'Content-Type': 'application/json; charset=UTF-8',
      },
      data: JSON.stringify(data),
    })
  }
  async addUsersToChat(data: IUsersChatMap): Promise<XMLHttpRequest> {
    return authInstance.put('/users', {
      headers: {
        'Content-Type': 'application/json; charset=UTF-8',
      },
      data: JSON.stringify(data),
    })
  }
  async getToken(chatId: string): Promise<XMLHttpRequest> {
    return authInstance.post(`/token/${chatId}`, {
      headers: {
        'Content-Type': 'application/json; charset=UTF-8',
      },
    })
  }
  async getChats(data: IGetChats) {
    return authInstance.get('/', {
      headers: {
        'Content-Type': 'application/json; charset=UTF-8',
      },
      data: JSON.stringify(data),
    })
  }
  async deleteUserFromChat(data: IUsersChatMap) {
    return authInstance.delete('/users', {
      headers: {
        'Content-Type': 'application/json; charset=UTF-8',
      },
      data: JSON.stringify(data),
    })
  }
  async getChatUser(data: { id: number }) {
    return authInstance.get(`/${data.id}/users`, {
      headers: {
        'Content-Type': 'application/json; charset=UTF-8',
      },
      data: JSON.stringify(data),
    })
  }
}
