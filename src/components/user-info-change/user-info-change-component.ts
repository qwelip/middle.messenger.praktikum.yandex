import { emailValidate, loginValidate, nameValidate, phoneValidate } from '../../utils/validate'
import Block from '../../core/block'
import { changeProfile } from '../../services/user'
import { IStore, store } from '../../store/store'
import connect from '../../utils/connect'
import { ButtonComponent } from '../button/button-component'
import InputNoBorderComponent from '../input-no-border/input-no-border-component'
import SuccessMsgComponent from './components/success-msg/success-msg-component'

class UserInfoChangeComponent extends Block {
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
        onClick: async () => {
          const email = this.children.input_mail.props.inputValue as string
          const login = this.children.input_login.props.inputValue as string
          const name = this.children.input_name.props.inputValue as string
          const surname = this.children.input_surname.props.inputValue as string
          const nick = this.children.input_nick.props.inputValue as string
          const phone = this.children.input_phone.props.inputValue as string

          if (emailValidate(email)) {
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

          try {
            await changeProfile({
              email,
              login,
              phone,
              first_name: name,
              second_name: surname,
              display_name: nick,
            })
            this.setProps({ errorMsg: null })
            this.children.sucMsg.setProps({ sucMsg: 'Данные обновлены' })
          } catch (error) {
            if (error instanceof Error) {
              this.setProps({ errorMsg: error.message })
            }
          }
        },
      }),
      sucMsg: new SuccessMsgComponent({
        sucMsg: '',
      }),
    })
  }

  componentDidMount(): void {
    if (this.props.errorMsg) {
      return
    }
    const { user, profile } = store.getState()
    if (profile) {
      this.children.input_mail.setProps({ inputValue: profile?.email })
      this.children.input_login.setProps({ inputValue: profile?.login })
      this.children.input_name.setProps({ inputValue: profile?.first_name })
      this.children.input_surname.setProps({ inputValue: profile?.second_name })
      this.children.input_nick.setProps({
        inputValue: profile?.display_name || profile?.first_name,
      })
      this.children.input_phone.setProps({ inputValue: profile?.phone })
    } else {
      this.children.input_mail.setProps({ inputValue: user?.email })
      this.children.input_login.setProps({ inputValue: user?.login })
      this.children.input_name.setProps({ inputValue: user?.first_name })
      this.children.input_surname.setProps({ inputValue: user?.second_name })
      this.children.input_nick.setProps({ inputValue: user?.display_name || user?.first_name })
      this.children.input_phone.setProps({ inputValue: user?.phone })
    }
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
        {{#if errorMsg}}
          <p class='user-info-change__error text-style text-style_size_12 text-style_color_red'>
            {{ errorMsg }}
          </p>
        {{/if}}
        {{{ sucMsg }}}
    </div>
    `
  }
}

function mapToProps(state: IStore) {
  return {
    profile: state.profile,
  }
}

export default connect(UserInfoChangeComponent, mapToProps)
