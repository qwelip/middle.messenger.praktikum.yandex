import {
  emailValidate,
  loginValidate,
  nameValidate,
  passwordValidate,
  phoneValidate,
} from '../../common/validate'
import ButtonStringComponent from '../../components/button-string/button-string-component'
import { ButtonComponent } from '../../components/button/button-component'
import InputCheckRepetePasswordComp from '../../components/input-check-repete-password/input-check-repete-password'
import InputComponent from '../../components/input/input-component'
import Block from '../../core/block'

export default class SignInPage extends Block {
  constructor(props?: any) {
    super('main', {
      ...props,
      input_mail: new InputComponent({
        name: 'email',
        type: 'text',
        errorMsg: 'Неверная почта',
        validateFn: emailValidate,
      }),
      input_login: new InputComponent({
        name: 'login',
        type: 'text',
        errorMsg: 'Неверный логин',
        validateFn: loginValidate,
      }),
      input_name: new InputComponent({
        name: 'first_name',
        type: 'text',
        errorMsg: 'Неверное имя',
        validateFn: nameValidate,
      }),
      input_surname: new InputComponent({
        name: 'second_name',
        type: 'text',
        errorMsg: 'Неверная фамилия',
        validateFn: nameValidate,
      }),
      input_tel: new InputComponent({
        name: 'phone',
        type: 'text',
        errorMsg: 'Неверный телефон',
        validateFn: phoneValidate,
      }),
      input_password: new InputComponent({
        name: 'password',
        type: 'password',
        errorMsg: 'Неверный пароль',
        validateFn: passwordValidate,
      }),
      input_passwordSec: new InputCheckRepetePasswordComp({
        target: 'password',
      }),
      button: new ButtonComponent({
        caption: 'Зарегистрироваться',
        page: 'chatPage',
        onClick: () => {
          const email =
            (this.children.input_mail.props.inputValue as string) || ''
          const login =
            (this.children.input_login.props.inputValue as string) || ''
          const firstName =
            (this.children.input_name.props.inputValue as string) || ''
          const secondName =
            (this.children.input_surname.props.inputValue as string) || ''
          const phone =
            (this.children.input_tel.props.inputValue as string) || ''
          const password =
            (this.children.input_password.props.inputValue as string) || ''
          const passwordRepete =
            (this.children.input_passwordSec.props.inputValue as string) || ''
          if (password !== passwordRepete) {
            this.children.input_passwordSec.setProps({ isError: true })
            return
          } else {
            this.children.input_passwordSec.setProps({ isError: false })
          }
          if (
            loginValidate(login) &&
            emailValidate(email) &&
            nameValidate(firstName) &&
            nameValidate(secondName) &&
            phoneValidate(phone) &&
            passwordValidate(password)
          ) {
            const formData = {
              login,
              email,
              firstName,
              secondName,
              phone,
              password,
            }
            console.log('formData', formData)
          }
        },
      }),
      buttonString: new ButtonStringComponent({
        caption: 'Войти',
        page: 'signInPage',
        isRed: false,
      }),
    })
  }

  render() {
    return `
      <main class='sign-in horizontal-centered'>
        <div class='sign-in__container'>
          <h2 class='sign-in__title'>Регистрация</h2>

          <div class='sign-in__input-wrapper'>
            {{#> Form}}
                <div class='sign-in__input'>
                  <label for='input' class='input-label text-style_color_gray'>Почта</label>
                  {{{ input_mail }}}
                </div>
                <div class='sign-in__input'>
                  <label for='input' class='input-label text-style_color_gray'>Логин</label>
                  {{{ input_login }}}
                </div>
                <div class='sign-in__input'>
                  <label for='input' class='input-label text-style_color_gray'>Имя</label>
                  {{{ input_name }}}
                </div>
                <div class='sign-in__input'>
                  <label for='input' class='input-label text-style_color_gray'>Фамилия</label>
                  {{{ input_surname }}}
                </div>
                <div class='sign-in__input'>
                  <label for='input' class='input-label text-style_color_gray'>Телефон</label>
                  {{{ input_tel }}}
                </div>
              <div class='sign-in__input'>
                <label for='input' class='input-label text-style_color_gray'>Пароль</label>
                {{{ input_password }}}
              </div>
              <div class='sign-in__input'>
                <label for='input' class='input-label text-style_color_gray'>Пароль (ещё раз)</label>
                {{{ input_passwordSec }}}
              </div>
              <div class='sign-in__btn-wrapper'>
                <div class='sign-in__btn'>
                  {{{ button }}}
                </div>
                <div class='sign-in__btn'>
                  {{{ buttonString }}}
                </div>
              </div>
            {{/Form}}
          </div>
        </div>
      </main>
    `
  }
}
