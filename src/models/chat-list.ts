export interface IMessage {
  text: string
  date: string
  msgReceivedIcon: string
  content?: string
  isMine: boolean
  isReceived?: boolean
}
