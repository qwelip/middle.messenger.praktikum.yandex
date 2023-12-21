import { IMessage } from '../models/chat-list'
import msgReceivedIcon from '../assets/msg-received.png'
import chatFoto from '../assets/chat-foto.png'

export const messagesMocData: IMessage[] = [
  {
    date: '11:56',
    text: `Привет! Смотри, тут всплыл интересный кусок лунной космической истории — 
    НАСА в какой-то момент попросила Хассельблад адаптировать модель SWC для полетов на Луну. 
    Сейчас мы все знаем что астронавты летали с моделью 500 EL — и к слову говоря, все тушки 
    этих камер все еще находятся на поверхности Луны, так как астронавты с собой забрали только 
    кассеты с пленкой. Хассельблад в итоге адаптировал SWC для космоса, но что-то пошло не так 
    и на ракету они так никогда и не попали. Всего их было произведено 25 штук, одну из них 
    недавно продали на аукционе за 45000 евро.`,
    isMine: false,
    msgReceivedIcon,
  },
  {
    date: '11:56',
    text: '123 123 123 1',
    content: chatFoto,
    isMine: false,
    msgReceivedIcon,
  },
  {
    date: '12:00',
    text: 'Круто!',
    isMine: true,
    isReceived: true,
    msgReceivedIcon,
  },
]
