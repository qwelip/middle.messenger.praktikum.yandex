import Handlebars from 'handlebars'
import { userInfoMocData } from '../../common/user-info-moc-data'

export { default as UserInfo } from './user-info.hbs?raw'

Handlebars.registerHelper('userInfo', () => {
  return userInfoMocData
})
