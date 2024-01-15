import Block from '../../../../core/block'
import InputSearchComponent from '../dialog/components/input-search/input-search-component'

interface IProps {
  arrowIcon: string
  magnifierIcon: string
}

export default class ChatListHeaderComponent extends Block {
  constructor(props: IProps) {
    super('div', {
      ...props,
      inputSearch: new InputSearchComponent(),
    })
  }

  render() {
    return `
      <div class='chat-list-header'>
        <a class='chat-list-header__profile-btn btn-styles'>
          <p
            page='profilePage'
            class='chat-list-header__text text-style text-style_color_gray'
          >Профиль</p>
          <img
            src={{arrowIcon}}
            alt='Профиль'
            class='chat-list-header__img'
            page='profilePage'
          />
        </a>
        {{#> Form}}
          {{{ inputSearch }}}
        {{/Form}}
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
