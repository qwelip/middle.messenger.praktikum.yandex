export { default as DialogContent } from './dialog-content.hbs?raw'
import Handlebars from 'handlebars'
import { messagesMocData } from '../../../../../../common/messages-moc-data'

Handlebars.registerHelper('messages', () => {
  return messagesMocData
})
