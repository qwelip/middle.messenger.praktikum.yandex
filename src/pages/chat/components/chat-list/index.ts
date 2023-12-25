export { default as ChatList } from './chat-list.hbs?raw'
import Handlebars from 'handlebars'
import { chatListMocData } from '../../../../common/chat-list-moc-data'

Handlebars.registerHelper('chatList', () => {
  return chatListMocData
})
