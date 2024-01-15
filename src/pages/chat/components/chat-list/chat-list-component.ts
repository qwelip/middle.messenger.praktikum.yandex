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
      chatListItem: new ChatListItemComponent({
        date: '',
        isSelected: true,
        message: '',
        name: '',
        onClick: () => console.log('123', 123),
      }),
    })
  }

  render() {
    return `
      <section class='chat-list'>
        {{{ header }}}
        <div class='chat-list__list'>
          
            {{{ chatListItem }}}
          
        </div>
      </section>
    `
  }
}
