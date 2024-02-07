import { notEmptyValidate, userIdValidate } from '../../utils/validate'
import Block from '../../core/block'
import { ButtonComponent } from '../button/button-component'
import InputComponent from '../input/input-component'
import CloseBtnComponent from '../close-btn/close-btn-component'
import { addUsersToChat } from '../../services/chat'
import { store } from '../../store/store'

export default class AddUserToChatComponent extends Block {
  constructor() {
    super('div', {
      closeBtn: new CloseBtnComponent({
        onClick: () => {
          this.hide()
        },
      }),
      userId: new InputComponent({
        name: 'userId',
        type: 'text',
        errorMsg: 'Неверное значение',
        validateFn: notEmptyValidate,
      }),
      button: new ButtonComponent({
        caption: 'Добавить',
        onClick: async () => {
          const { selectedChat } = store.getState()
          const userIdComp = this.children.userId
          const userId = (userIdComp.props.inputValue as string) || ''

          if (notEmptyValidate(userId) && userIdValidate(userId)) {
            userIdComp.setProps({ isError: false })
          } else {
            userIdComp.setProps({ isError: true })
            return
          }

          try {
            await addUsersToChat({ chatId: +selectedChat!, users: [+userId] })
            this.hide()
            this.setProps({ successMsg: 'Пользователь добавлен' })
            this.setProps({ errorMsg: '' })
          } catch (error) {
            this.setProps({ successMsg: ' ' })
            if (error instanceof Error) {
              this.setProps({ errorMsg: error.message })
            }
          }
        },
      }),
    })
  }

  beforeMount() {
    if (this.element && !this.props.isOpen) {
      this.hide()
    }
  }

  render() {
    return `
      <div data-setevent data-closePopup class='popup-add-user'>
        <div class='popup-add-user__close-btn'>
          {{{ closeBtn }}}
        </div>
        <div class='popup-add-user__wrapper'>
          <form id='chatForm' name='chatForm' class='popup__window horizon-centered-content'>
            <h2 class='popup__title button-add-chat__title'>Добавить пользователя</h2>
              <div class='login__input button-add-chat__input'>
                <label for='input' class='input-label text-style_color_gray'>Id пользователя</label>
                {{{ userId }}}
              </div>
              <a data-setevent class='button button-add-chat'>
                {{{ button }}}
              </a>
              {{#if errorMsg}}
                <p class='login__error text-style text-style_size_12 text-style_color_red'>
                  {{ errorMsg }}
                </p>
              {{/if}}
              {{#if successMsg}}
                <p class='login__error text-style text-style_size_12 '>
                  {{ successMsg }}
                </p>
              {{/if}}
          </form>
        </div>
      </div>
    `
  }
}
