import { loginValidate, passwordValidate } from '../../common/validate'
import ButtonStringComponent from '../../components/button-string/button-string-component'
import { ButtonComponent } from '../../components/button/button-component'
import InputComponent from '../../components/input/input-component'
import Block from '../../core/block'

export default class LoginPage extends Block {
  constructor(props?: any) {
    super('main', {
      ...props,
      input_1: new InputComponent({
        name: 'login',
        type: 'text',
        inputValue: '',
        isError: false,
        validateFn: loginValidate,
      }),
      input_2: new InputComponent({
        name: 'password',
        type: 'password',
        isError: false,
        validateFn: passwordValidate,
      }),
      button: new ButtonComponent({
        caption: 'Авторизоваться',
        page: 'chatPage',
        onClick: () => {},
      }),
      buttonString: new ButtonStringComponent({
        caption: 'Нет аккаунта?',
        page: 'signInPage',
        isRed: false,
        onClick: () => {},
      }),
    })
  }

  dispatchComponentDidMount() {
    const form = document.body.querySelector('form')!
    const login: HTMLFormElement = form.querySelector('input[name=login]')!
    const password: HTMLFormElement = form.querySelector(
      'input[name=password]'
    )!
    form?.addEventListener('submit', (e) => {
      e.preventDefault()
      console.log('ogin.value', login.value)
      console.log('password.value', password.value)
      if (loginValidate(login.value) && passwordValidate(password.value)) {
        const formData = {
          login: login.value,
          password: password.value,
        }
        console.log('formData', formData)
      }
    })
  }

  componentDidUpdate(oldProps: any, newProps: any) {
    if (oldProps.caption !== newProps.caption) {
      this.children.button.setProps({ caption: newProps.caption })
    }
    return false
  }

  render() {
    return `
    <main class='login horizontal-centered'>
      <div class='login__container'>
        <h2 class='login__title'>Вход</h2>
        <div class='login__input-wrapper'>
          {{#> Form}}
            <div class='login__input'>
              <label for='input' class='input-label text-style_color_gray'>Логин</label>
              {{{input_1}}}
            </div>

            <div class='login__input'>
              <label for='input' class='input-label text-style_color_gray'>Пароль</label>
              {{{input_2}}}
            </div>
            <div class='login__btn-wrapper'>
              <div class='login__btn'>
                {{{button}}}
              </div>
              <div class='login__btn'>
                {{{ buttonString }}}
              </div>
            </div>
          {{/Form}}
        </div>
      </div>
    </main>`
  }
}
