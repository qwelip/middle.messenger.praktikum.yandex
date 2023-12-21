import Handlebars from 'handlebars'
import { userInfoMocData } from '../../common/user-info-moc-data'

export { default as UserInfoChange } from './user-info-change.hbs?raw'

Handlebars.registerHelper('userInfo', () => {
  return userInfoMocData
})
