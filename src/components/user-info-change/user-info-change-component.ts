import {
  emailValidate,
  loginValidate,
  nameValidate,
  phoneValidate,
} from '../../common/validate'
import Block from '../../core/block'
import { ButtonComponent } from '../button/button-component'
import InputNoBorderComponent from '../input-no-border/input-no-border-component'

export default class UserInfoChangeComponent extends Block {
  constructor() {
    super('div', {
      input_mail: new InputNoBorderComponent({
        name: 'email',
        type: 'text',
        inputValue: 'pochta@yandex.ru',
        errorMsg: 'Неверная почта',
        validateFn: emailValidate,
      }),
      input_login: new InputNoBorderComponent({
        name: 'login',
        type: 'text',
        inputValue: 'ivanivanov',
        errorMsg: 'Неверный логин',
        validateFn: loginValidate,
      }),
      input_name: new InputNoBorderComponent({
        name: 'first_name',
        type: 'text',
        inputValue: 'Иван',
        errorMsg: 'Неверное имя',
        validateFn: nameValidate,
      }),
      input_surname: new InputNoBorderComponent({
        name: 'second_name',
        type: 'text',
        inputValue: 'Иванов',
        errorMsg: 'Неверная фамилия',
        validateFn: nameValidate,
      }),
      input_nick: new InputNoBorderComponent({
        name: 'display_name',
        type: 'text',
        inputValue: 'Иван',
        errorMsg: 'Неверное имя',
        validateFn: nameValidate,
      }),
      input_phone: new InputNoBorderComponent({
        name: 'phone',
        type: 'text',
        inputValue: '+7 (909) 967 30 30',
        errorMsg: 'Неверный телефон',
        validateFn: phoneValidate,
      }),
      button: new ButtonComponent({
        caption: 'Сохранить',
        page: 'chatPage',
        onClick: () => {
          const mail = this.children.input_mail.props.inputValue as string
          const login = this.children.input_login.props.inputValue as string
          const name = this.children.input_name.props.inputValue as string
          const surname = this.children.input_surname.props.inputValue as string
          const nick = this.children.input_nick.props.inputValue as string
          const phone = this.children.input_phone.props.inputValue as string

          if (emailValidate(mail)) {
            this.children.input_mail.setProps({ isError: false })
          } else {
            this.children.input_mail.setProps({ isError: true })
            return
          }

          if (loginValidate(login)) {
            this.children.input_login.setProps({ isError: false })
          } else {
            this.children.input_login.setProps({ isError: true })
            return
          }

          if (nameValidate(name)) {
            this.children.input_name.setProps({ isError: false })
          } else {
            this.children.input_name.setProps({ isError: true })
            return
          }

          if (nameValidate(surname)) {
            this.children.input_surname.setProps({ isError: false })
          } else {
            this.children.input_surname.setProps({ isError: true })
            return
          }

          if (nameValidate(nick)) {
            this.children.input_nick.setProps({ isError: false })
          } else {
            this.children.input_nick.setProps({ isError: true })
            return
          }

          if (phoneValidate(phone)) {
            this.children.input_phone.setProps({ isError: false })
          } else {
            this.children.input_phone.setProps({ isError: true })
            return
          }

          console.log({ mail, login, name, surname, nick, phone })
        },
      }),
    })
  }

  render() {
    return `
    <div class='user-info-change'>
        <form>
          <ul class='user-info-change__list list'>
            <li class='user-info-change__list-item list-item'>
              <p class='user-info-change__text text-style'>Почта</p>
              {{{ input_mail }}}
            </li>
            <li class='user-info-change__list-item list-item'>
              <p class='user-info-change__text text-style'>Логин</p>
              {{{ input_login }}}
            </li>
            <li class='user-info-change__list-item list-item'>
              <p class='user-info-change__text text-style'>Имя</p>
              {{{ input_name }}}
            </li>
            <li class='user-info-change__list-item list-item'>
              <p class='user-info-change__text text-style'>Фамилия</p>
              {{{ input_surname }}}
            </li>
            <li class='user-info-change__list-item list-item'>
              <p class='user-info-change__text text-style'>Имя в чате</p>
              {{{ input_nick }}}
            </li>
            <li class='user-info-change__list-item list-item'>
              <p class='user-info-change__text text-style'>Телефон</p>
              {{{ input_phone }}}
            </li>
          </ul>
          {{{ button }}}
        </form>
    </div>
    `
  }
}
