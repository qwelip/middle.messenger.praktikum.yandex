import Block from '../../core/block'
import ChatListComponent from './components/chat-list/chat-list-component'
import DialogPage from './components/dialog/dialog-page'

export default class ChatPage extends Block {
  constructor() {
    super('main', {
      chatList: new ChatListComponent('section', {}),
      dialog: new DialogPage('section', {
        isEmpty: false,
      }),
    })
  }

  render() {
    return `
      <main class='chat'>
        {{{ chatList }}}
        {{{ dialog }}}
      </main>
    `
  }
}
