import {
  emailValidate,
  loginValidate,
  nameValidate,
  passwordRepeateValidate,
  passwordValidate,
  phoneValidate,
} from '../../common/validate'
import ButtonStringComponent from '../../components/button-string/button-string-component'
import { ButtonComponent } from '../../components/button/button-component'
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
      input_passwordSec: new InputComponent({
        name: 'passwordSec',
        type: 'password',
        errorMsg: 'Пароли не совпадают',
        validateFn: passwordRepeateValidate,
      }),
      button: new ButtonComponent({
        caption: 'Зарегистрироваться',
        page: 'chatPage',
      }),
      buttonString: new ButtonStringComponent({
        caption: 'Войти',
        page: 'signInPage',
        isRed: false,
      }),
    })
  }

  dispatchComponentDidMount() {
    const form = document.body.querySelector('form')!
    form.addEventListener('submit', (e) => {
      e.preventDefault()
      const email: HTMLFormElement = form.querySelector('input[name=email]')!
      const login: HTMLFormElement = form.querySelector('input[name=login]')!
      const first_name: HTMLFormElement = form.querySelector(
        'input[name=first_name]'
      )!
      const second_name: HTMLFormElement = form.querySelector(
        'input[name=second_name]'
      )!
      const phone: HTMLFormElement = form.querySelector('input[name=phone]')!
      const password: HTMLFormElement = form.querySelector(
        'input[name=password]'
      )!
      const passwordSec: HTMLFormElement = form.querySelector(
        'input[name=passwordSec]'
      )!

      if (
        loginValidate(login.value) &&
        emailValidate(email.value) &&
        nameValidate(first_name.value) &&
        nameValidate(second_name.value) &&
        phoneValidate(phone.value) &&
        passwordValidate(password.value) &&
        passwordRepeateValidate(passwordSec.value)
      ) {
        const formData = {
          login: login.value,
          email: email.value,
          first_name: first_name.value,
          second_name: second_name.value,
          phone: phone.value,
          password: password.value,
          passwordSec: passwordSec.value,
        }
        console.log('formData', formData)
      }
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
