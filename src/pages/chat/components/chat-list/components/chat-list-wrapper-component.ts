import Block from '../../../../../core/block'
import { store } from '../../../../../store/store'

export default class ChatListWrapperComponent extends Block {
  constructor() {
    super('div', {
      onClick: (e: Event) => {
        const elem = e.target as Element
        const id = elem.getAttribute('data-chatId')
        store.set('selectedChat', id)
      },
    })
  }

  render() {
    return `
      <div id='ChatListWrapperComponent'>
        {{#each chats}}
          {{{ ChatListItemComponent 
            isSelected=this.isSelected 
            chatid=this.id 
            name=this.name 
            message=this.message
            onClick=../onClick 
          }}}
        {{/each}}
      </div>
    `
  }
}
