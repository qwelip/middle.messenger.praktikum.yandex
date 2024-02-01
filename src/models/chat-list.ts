// todom возможно файл не нужен
export interface IChatListItem {
  name: string
  date: string
  text: string
  unreadMsg?: string
  isSelected?: boolean
}

export interface IMessage {
  text: string
  date: string
  msgReceivedIcon: string
  content?: string
  isMine: boolean
  isReceived?: boolean
}

export interface IUserInfo {
  [keys: string]: unknown
}
