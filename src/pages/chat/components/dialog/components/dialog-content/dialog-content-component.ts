import Block from '../../../../../../core/block'
import DialogDateComponent from '../dialog-date/dialog-date-component'
import MessageItemComponent from '../message-item/message-item-component'

export default class DialogContentComponent extends Block {
  constructor() {
    super('section', {
      dialogDate: new DialogDateComponent({
        date: '19 июня',
      }),
      message: new MessageItemComponent({
        contentImg: '',
        date: '',
        isMine: false,
        message: '',
        msgReceivedIcon: '',
      }),
    })
  }

  render() {
    return `
    <section class='dialog-content'>
      {{{ dialogDate }}}
      
      {{{ message }}}
      
    </section>
    `
  }
}
