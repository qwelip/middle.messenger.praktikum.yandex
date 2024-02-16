import { passwordValidate } from '../../../utils/validate'
import { ButtonComponent } from '../../../components/button/button-component'
import InputCheckRepetePasswordNoBorderComp from '../../../components/input-check-repete-password-no-border/input-check-repete-password-no-border-comp'
import InputNoBorderComponent from '../../../components/input-no-border/input-no-border-component'
import SuccessMsgComponent from '../../../components/user-info-change/components/success-msg/success-msg-component'
import Block from '../../../core/block'
import { changePassword } from '../../../services/user'

export class ChangePasswordForm extends Block {
  constructor() {
    super('ul', {
      input_old_password: new InputNoBorderComponent({
        name: 'oldPassword',
        type: 'password',
        errorMsg: 'Неправильный пароль',
        inputValue: '',
        validateFn: passwordValidate,
      }),
      input_new_password: new InputNoBorderComponent({
        name: 'newPassword',
        type: 'password',
        errorMsg: 'Неправильный пароль',
        inputValue: '',
        validateFn: passwordValidate,
      }),
      input_new_repete_password: new InputCheckRepetePasswordNoBorderComp({
        target: 'newPassword',
      }),
      button: new ButtonComponent({
        caption: 'Сохранить',
        onClick: async () => {
          const oldPasswordComp = this.children.input_old_password
          const newPasswordComp = this.children.input_new_password
          const repetePassComp = this.children.input_new_repete_password

          const oldPassword = (oldPasswordComp.props.inputValue as string) || ''
          const newPassword = (newPasswordComp.props.inputValue as string) || ''
          const repetePassword = (repetePassComp.props.inputValue as string) || ''

          if (
            passwordValidate(oldPassword) &&
            passwordValidate(repetePassword) &&
            repetePassword &&
            newPassword &&
            repetePassword === newPassword
          ) {
            oldPasswordComp.setProps({ isError: false })
            newPasswordComp.setProps({ isError: false })
            repetePassComp.setProps({ isError: false })

            try {
              await changePassword({ oldPassword, newPassword })
              this.setProps({ errorMsg: null })
              this.children.sucMsg.setProps({ sucMsg: 'Данные обновлены' })
            } catch (error) {
              if (error instanceof Error) {
                this.setProps({ errorMsg: error.message })
              }
            }
            return
          }

          if (!repetePassword) {
            repetePassComp.setProps({ isError: true })
          }
          if (!passwordValidate(oldPassword)) {
            oldPasswordComp.setProps({ isError: true })
          }
          if (!passwordValidate(newPassword)) {
            newPasswordComp.setProps({ isError: true })
          }
        },
      }),
      sucMsg: new SuccessMsgComponent({
        sucMsg: '',
      }),
    })
  }

  render() {
    return `
        <form>
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
            {{#if errorMsg}}
              <p class='user-info-change__error text-style text-style_size_12 text-style_color_red'>
                {{ errorMsg }}
              </p>
            {{/if}}
            {{{ sucMsg }}}
        </form>
      `
  }
}
