import { loginValidate, passwordValidate } from '../../common/validate'
import ButtonStringComponent from '../../components/button-string/button-string-component'
import { ButtonComponent } from '../../components/button/button-component'
import InputComponent from '../../components/input/input-component'
import Block from '../../core/block'

export default class LoginPage extends Block {
  constructor(props?: any) {
    super('main', {
      ...props,
      input_login: new InputComponent({
        name: 'login',
        type: 'text',
        errorMsg: 'Неверный логин',
        validateFn: loginValidate,
      }),
      input_password: new InputComponent({
        name: 'password',
        type: 'password',
        errorMsg: 'Неверный пароль',
      }),
      button: new ButtonComponent({
        caption: 'Авторизоваться',
        page: 'chatPage',
        onClick: () => {
          const loginComp = this.children.input_login
          const passwordComp = this.children.input_password
          const login = (loginComp.props.inputValue as string) || ''
          const password = (passwordComp.props.inputValue as string) || ''

          if (loginValidate(login)) {
            loginComp.setProps({ isError: false })
          } else {
            loginComp.setProps({ isError: true })
            return
          }

          if (passwordValidate(password)) {
            passwordComp.setProps({ isError: false })
          } else {
            passwordComp.setProps({ isError: true })
            return
          }
          console.log({ login, password })
        },
      }),
      buttonString: new ButtonStringComponent({
        caption: 'Нет аккаунта?',
        page: 'signInPage',
        isRed: false,
      }),
    })
  }

  render() {
    return `
    <main class='login horizontal-centered'>
      <div class='login__container'>
        <h2 class='login__title'>Вход</h2>
        <div class='login__input-wrapper'>
          <form>
            <div class='login__input'>
              <label for='input' class='input-label text-style_color_gray'>Логин</label>
              {{{input_login}}}
            </div>

            <div class='login__input'>
              <label for='input' class='input-label text-style_color_gray'>Пароль</label>
              {{{input_password}}}
            </div>
            <div class='login__btn-wrapper'>
              <div class='login__btn'>
                {{{button}}}
              </div>
              <div class='login__btn'>
                {{{ buttonString }}}
              </div>
            </div>
          </form>
        </div>
      </div>
    </main>`
  }
}