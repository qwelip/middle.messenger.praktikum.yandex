import { loginValidate, passwordValidate } from '../../utils/validate'
import ButtonStringComponent from '../../components/button-string/button-string-component'
import { ButtonComponent } from '../../components/button/button-component'
import InputComponent from '../../components/input/input-component'
import Block from '../../core/block'
import { router } from '../../core/router'
import { login } from '../../services/auth'
import { getChats } from '../../services/chat'
import { IStore, store } from '../../store/store'
import connect from '../../utils/connect'

class LoginPage extends Block {
  constructor() {
    super('main', {
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
        onClick: async () => {
          const loginComp = this.children.input_login
          const passwordComp = this.children.input_password
          const loginInput = (loginComp.props.inputValue as string) || ''
          const password = (passwordComp.props.inputValue as string) || ''

          if (loginValidate(loginInput)) {
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
          try {
            await login({ login: loginInput, password })
            this.setProps({ errorMsg: null })
            this.children.input_login.setProps({ inputValue: '' })
            this.children.input_password.setProps({ inputValue: '' })
            const chats = await getChats({
              offset: 0,
              limit: 100,
            })
            window.store.set('chats', chats)
            router.go('/messenger')
          } catch (error) {
            if (error instanceof Error) {
              this.setProps({ errorMsg: error.message })
            }
          }
        },
      }),
      buttonString: new ButtonStringComponent({
        caption: 'Нет аккаунта?',
        isRed: false,
        onClick: () => router.go('/sign-up'),
      }),
    })
  }

  componentDidMount(): void {
    const { user } = store.getState()
    if (user) {
      router.go('/messenger')
    }
  }

  beforeMount() {
    const { user } = store.getState()
    if (user) {
      router.go('/messenger')
    }
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
          {{#if errorMsg}}
            <p class='login__error text-style text-style_size_12 text-style_color_red'>
              {{ errorMsg }}
            </p>
          {{/if}}
        </div>
      </div>
    </main>`
  }
}

function mapToProps(state: IStore) {
  return {
    user: state.user,
  }
}

export default connect(LoginPage, mapToProps)
