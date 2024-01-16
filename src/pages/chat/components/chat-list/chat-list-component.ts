import Block from '../../../../core/block'
import images from '../../../../utils/import-img'
import ChatListHeaderComponent from '../chat-list-header/chat-list-header-component'
import ChatListItemComponent from '../chat-list-item/chat-list-item-component'

export default class ChatListComponent extends Block {
  constructor() {
    super('section', {
      header: new ChatListHeaderComponent({
        arrowIcon: images.arrowIcon,
        magnifierIcon: images.magnifierIcon,
      }),
      chatListItem1: new ChatListItemComponent({
        date: '12:00',
        isSelected: true,
        message: 'Друзья, у меня для вас особенный выпуск новостей новостей новостей!',
        name: 'Илья',
        onClick: () => {},
      }),
      chatListItem2: new ChatListItemComponent({
        date: '1 Мая 2020',
        isSelected: false,
        message: 'Миллионы россиян ежедневно проводят десятки часов свое...',
        name: 'тет-а-теты',
        onClick: () => {},
      }),
    })
  }

  render() {
    return `
      <section class='chat-list'>
        {{{ header }}}
        <div class='chat-list__list'>
            {{{ chatListItem1 }}}
            {{{ chatListItem2 }}}
        </div>
      </section>
    `
  }
}
