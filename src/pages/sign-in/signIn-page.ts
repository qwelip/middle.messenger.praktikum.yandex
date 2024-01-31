import { INewUser } from '../../api/authApi'
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
import { router } from '../../core/router'
import { createUser } from '../../services/auth'

export default class SignInPage extends Block {
  constructor() {
    super('main', {
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
      input_passwordRepete: new InputCheckRepetePasswordComp({
        target: 'password',
      }),
      button: new ButtonComponent({
        caption: 'Зарегистрироваться',
        onClick: async () => {
          const emailComp = this.children.input_mail
          const loginComp = this.children.input_login
          const firstNameComp = this.children.input_name
          const secondNameComp = this.children.input_surname
          const phoneComp = this.children.input_tel
          const passwordComp = this.children.input_password
          const passwordRepeteComp = this.children.input_passwordRepete

          const email = (emailComp.props.inputValue as string) || ''
          const login = (loginComp.props.inputValue as string) || ''
          const firstName = (firstNameComp.props.inputValue as string) || ''
          const secondName = (secondNameComp.props.inputValue as string) || ''
          const phone = (phoneComp.props.inputValue as string) || ''
          const password = (passwordComp.props.inputValue as string) || ''
          const passwordRepete = (passwordRepeteComp.props.inputValue as string) || ''

          if (
            loginValidate(login) &&
            emailValidate(email) &&
            nameValidate(firstName) &&
            nameValidate(secondName) &&
            phoneValidate(phone) &&
            passwordValidate(password) &&
            password &&
            passwordRepete &&
            password === passwordRepete
          ) {
            const formData: INewUser = {
              login,
              email,
              first_name: firstName,
              second_name: secondName,
              phone,
              password,
            }
            try {
              await createUser(formData)
              this.setProps({ errorMsg: null })
              router.go('/messenger')
            } catch (error) {
              if (error instanceof Error) {
                this.setProps({ errorMsg: error.message })
              }
            }
            return
          }

          if (password && passwordRepete && password !== passwordRepete) {
            passwordRepeteComp.setProps({ isError: true })
            return
          }

          if (!passwordRepete) {
            passwordRepeteComp.setProps({ isError: true })
          }

          if (!loginValidate(login)) {
            loginComp.setProps({ isError: true })
          }
          if (!emailValidate(email)) {
            emailComp.setProps({ isError: true })
          }
          if (!nameValidate(firstName)) {
            firstNameComp.setProps({ isError: true })
          }
          if (!nameValidate(secondName)) {
            secondNameComp.setProps({ isError: true })
          }
          if (!phoneValidate(phone)) {
            phoneComp.setProps({ isError: true })
          }
          if (!passwordValidate(password)) {
            passwordComp.setProps({ isError: true })
          }
        },
      }),
      buttonString: new ButtonStringComponent({
        caption: 'Войти',
        isRed: false,
        onClick: () => router.go('/'),
      }),
    })
  }

  render() {
    return `
      <main class='sign-in horizontal-centered'>
        <div class='sign-in__container'>
          <h2 class='sign-in__title'>Регистрация</h2>

          <div class='sign-in__input-wrapper'>
            <form>
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
                {{{ input_passwordRepete }}}
              </div>
              <div class='sign-in__btn-wrapper'>
                <div class='sign-in__btn'>
                  {{{ button }}}
                </div>
                <div class='sign-in__btn'>
                  {{{ buttonString }}}
                </div>
              </div>
            </form>
            {{#if errorMsg}}
              <p class='sign-in__error text-style text-style_size_12 text-style_color_red'>
                {{ errorMsg }}
              </p>
            {{/if}}
          </div>
        </div>
      </main>
    `
  }
}
