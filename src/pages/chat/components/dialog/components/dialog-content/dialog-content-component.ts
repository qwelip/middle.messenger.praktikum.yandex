import Block from '../../../../../../core/block'
import images from '../../../../../../utils/import-img'
import DialogDateComponent from '../dialog-date/dialog-date-component'
import MessageItemComponent from '../message-item/message-item-component'

export default class DialogContentComponent extends Block {
  constructor() {
    super('section', {
      dialogDate: new DialogDateComponent({
        date: '19 июня',
      }),
      message1: new MessageItemComponent({
        contentImg: images.msgReceivedIcon,
        date: '11:56',
        isMine: false,
        message: `Привет! Смотри, тут всплыл интересный кусок лунной космической истории
        — НАСА в какой-то момент попросила Хассельблад адаптировать модель SWC для полетов на Луну. 
        Сейчас мы все знаем что астронавты летали с моделью 500 EL
        — и к слову говоря, все тушки этих камер все еще находятся на поверхности 
        Луны, так как астронавты с собой забрали только кассеты с пленкой.`,
        msgReceivedIcon: '',
      }),
      message2: new MessageItemComponent({
        contentImg: '',
        date: '12:00',
        isMine: true,
        message: `Круто!`,
        msgReceivedIcon: images.msgReceivedIcon,
      }),
    })
  }

  render() {
    return `
    <section class='dialog-content'>
      {{{ dialogDate }}}
      {{{ message1 }}}
      {{{ message2 }}}
    </section>
    `
  }
}
