import AddChatPopupComponent from '../../../../components/add-chat-popup/add-chat-popup-component'
import ButtonStringComponent from '../../../../components/button-string/button-string-component'
import Block, { IOldNewProps } from '../../../../core/block'
import { router } from '../../../../main'
import InputSearchComponent from '../dialog/components/input-search/input-search-component'
import ProfileBtnComponent from './components/profile-btn/profile-btn-component'

interface IProps {
  arrowIcon: string
  magnifierIcon: string
}

export default class ChatListHeaderComponent extends Block {
  constructor(props: IProps) {
    super('div', {
      ...props,
      inputSearch: new InputSearchComponent(),
      addChat: new ButtonStringComponent({
        caption: 'Создать диалог',
        isRed: false,
        onClick: () => {
          this.setProps({ isPopupShow: true })
        },
      }),
      profileBtn: new ProfileBtnComponent({
        arrowIcon: props.arrowIcon,
        onClick: () => router.go('/profile'),
      }),
      popup: new AddChatPopupComponent({
        close: () => {
          this.setProps({ isPopupShow: false })
        },
      }),
    })
  }

  componentDidUpdate({ newProps }: IOldNewProps) {
    const { isPopupShow } = newProps
    if (isPopupShow) {
      const popup = this.children.popup as Block
      popup.show()
    }
    if (!isPopupShow) {
      const popup = this.children.popup as Block
      popup.hide()
    }
    return true
  }

  render() {
    return `
      <div class='chat-list-header'>
        {{{ popup }}}
        <div class='chat-list-header__buttons'>
          {{{ addChat }}}
          {{{ profileBtn }}}
        </div>
        <form clas='chat-list-header__form'>
          {{{ inputSearch }}}
        </form>
          <img
            src={{magnifierIcon}}
            alt='Поиск'
            class='chat-list-header__placeholder-icon'
          />
        </div>
      </div>
    `
  }
}
