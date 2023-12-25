export { default as SignInPage } from './sign-in.hbs?raw'
import Handlebars from 'handlebars'
import { baseUserInfo } from '../../common/user-info-moc-data'

Handlebars.registerHelper('registrationUserInfo', () => {
  return baseUserInfo
})
