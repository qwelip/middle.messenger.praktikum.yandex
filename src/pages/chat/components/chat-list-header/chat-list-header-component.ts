import Block from '../../../../core/block'
import { router } from '../../../../core/router'
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
      profileBtn: new ProfileBtnComponent({
        arrowIcon: props.arrowIcon,
        onClick: () => router.go('/profile'),
      }),
    })
  }

  render() {
    return `
      <div class='chat-list-header'>
        {{{ profileBtn }}}
        <form>
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
