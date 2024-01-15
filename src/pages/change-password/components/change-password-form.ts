import { passwordValidate } from '../../../common/validate'
import { ButtonComponent } from '../../../components/button/button-component'
import InputCheckRepetePassword from '../../../components/input-check-repete-password/input-check-repete-password'
import InputNoBorderComponent from '../../../components/input-no-border/input-no-border-component'
import Block from '../../../core/block'

interface IProps {
  oldPassword: string
  newPassword: string
  repetePassword: string
  isPasswordRepeteError: boolean
}

export class ChangePasswordForm extends Block {
  constructor(props: IProps) {
    super('ul', {
      ...props,
      input_old_password: new InputNoBorderComponent({
        name: 'oldPassword',
        type: 'password',
        errorMsg: 'Неверный пароль',
        inputValue: props.oldPassword,
        validateFn: passwordValidate,
      }),
      input_new_password: new InputNoBorderComponent({
        name: 'newPassword',
        type: 'password',
        errorMsg: 'Неверный пароль',
        inputValue: props.newPassword,
        validateFn: passwordValidate,
      }),
      input_new_repete_password: new InputCheckRepetePassword({
        target: 'newPassword',
      }),
      button: new ButtonComponent({
        caption: 'Сохранить',
        page: 'chatPage',
        onClick: () => {
          const oldPassword = this.children.input_old_password.props
            .inputValue as string
          const repetePassword = this.children.input_new_repete_password.props
            .inputValue as string
          const newPassword = this.children.input_new_password.props
            .inputValue as string
          if (repetePassword !== newPassword) {
            this.children.input_new_repete_password.setProps({ isError: true })
            return
          } else {
            this.children.input_new_repete_password.setProps({ isError: false })
          }
          if (
            passwordValidate(oldPassword) &&
            passwordValidate(repetePassword)
          ) {
            console.log({ oldPassword, newPassword })
          }
        },
      }),
    })
  }

  render() {
    return `
        {{#> Form}}
          <ul class='change-password__list list'>
            <li class='change-password__list-item list-item'>
                <p class='change-password__text text-style'>Старый пароль</p>
                {{{ input_old_password }}}
              </li>
            <li class='change-password__list-item list-item'>
                <p class='change-password__text text-style'>Новый пароль</p>
                {{{ input_new_password }}}
              </li>
            <li class='change-password__list-item list-item'>
                <p class='change-password__text text-style'>Повторите новый пароль</p>
                {{{ input_new_repete_password }}}
              </li>
          </ul>
          {{{ button }}}
        {{/Form}}
      `
  }
}
