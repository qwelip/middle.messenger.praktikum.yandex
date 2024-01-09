import Handlebars from 'handlebars'
import * as Components from './components'
import * as ChatComponents from './pages/chat/components'
import * as DialogComponents from './pages/chat/components/dialog/components'
import * as Pages from './pages'
import * as PagesTemp from './pages/composite-pages-temp'
import images from './utils/import-img'
import { addOpenPopupHandle } from './utils/utils'
import LoginPage from './pages/login/loginPage'

const pages = {
  chatPage: [Pages.ChatPage, { ...images }],
  profilePage: [Pages.ProfilePage, { ...images }],
  changeUserDataPage: [Pages.ChangeUserDataPage, { ...images }],
  changePasswordPage: [Pages.ChangePasswordPage, { ...images }],
  loginPage: [Pages.LoginPage],
  signInPage: [Pages.SignInPage],
  page500: [Pages.Page500],
  page404: [Pages.Page404],
  newAvatarPage: [PagesTemp.NewAvatarPage, { ...images }],
  newUserPage: [PagesTemp.NewUser, { ...images }],
  empyChat: [PagesTemp.EmpyChat, { ...images }],
}

Object.entries({
  ...Components,
  ...ChatComponents,
  ...DialogComponents,
}).forEach(([name, component]) => {
  Handlebars.registerPartial(name, component)
})

function navigate(page: keyof typeof pages) {
  const container = document.getElementById('app')!
  const [source, context] = pages[page]
  const block = new LoginPage()
  container.append(block.getContent()!)
  // container.innerHTML = Handlebars.compile(source)(context)
}

document.addEventListener('DOMContentLoaded', () => {
  navigate('chatPage')
  addOpenPopupHandle(
    'dialog-sender__pin-img',
    'popup-dialog-sender',
    images.pinIcon,
    images.pinIconActive
  )
  addOpenPopupHandle(
    'dialog-header__btn-img',
    'popup-dialog-header',
    images.contextMenuIcon,
    images.contextMenuIconActive
  )
})

document.addEventListener('click', (e) => {
  const event = e.target as HTMLElement
  const page = event.getAttribute('page') as keyof typeof pages | null
  if (page) {
    navigate(page)
    e.preventDefault()
    e.stopImmediatePropagation()
  }
})
