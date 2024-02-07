import Block from '../../../../core/block'
import { IChatsWithActive } from '../../../../models/api-models'
import { IStore, store } from '../../../../store/store'
import connect from '../../../../utils/connect'
import images from '../../../../utils/import-img'
import ChatListHeaderComponent from '../chat-list-header/chat-list-header-component'
import ChatListWrapperComponent from './components/chat-list-wrapper-component'

class ChatListComponent extends Block {
  constructor() {
    super('section', {
      header: new ChatListHeaderComponent({
        arrowIcon: images.arrowIcon,
        magnifierIcon: images.magnifierIcon,
      }),
      chatsWrapper: new ChatListWrapperComponent(),
    })
  }

  componentDidMount() {
    const { chats, selectedChat } = store.getState()
    const chatsWithActiveChat = chats?.map<IChatsWithActive>((item) => {
      const isSelected = selectedChat ? +selectedChat === item.id : false
      const day = new Date(item.created_by).getDay()
      const month = new Date(item.created_by).getMonth()
      const date = `${day}.${month}`
      const message = item.last_message?.content || '-'
      const name = item.title
      return {
        ...item,
        isSelected,
        date,
        message,
        name,
      }
    })
    this.children.chatsWrapper.setProps({ chats: chatsWithActiveChat })
  }

  render() {
    return `
      <section class='chat-list'>
        {{{ header }}}
        <div class='chat-list__list'>
          {{{ chatsWrapper }}}
        </div>
      </section>
    `
  }
}

function mapToProps(state: IStore) {
  return {
    chats: state.chats,
    selectedChat: state.selectedChat,
  }
}

export default connect(ChatListComponent, mapToProps)
