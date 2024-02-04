import { IAddUsersToChat, INewChat } from '../models/data-models'
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
  async addUsersToChat(data: IAddUsersToChat): Promise<XMLHttpRequest> {
    return authInstance.put('/users', {
      headers: {
        'Content-Type': 'application/json; charset=UTF-8',
      },
      data: JSON.stringify(data),
    })
  }
  async getChatUsers(chatId: string): Promise<XMLHttpRequest> {
    return authInstance.post(`/token/${chatId}`, {
      headers: {
        'Content-Type': 'application/json; charset=UTF-8',
      },
    })
  }
}
