import Block from '../../../../../../core/block'

interface IProps {
  isMine: boolean
  message: string
  date: string
  contentImg?: string
  msgReceivedIcon?: string
}

export default class MessageItemComponent extends Block {
  constructor(props: IProps) {
    super('div', {
      ...props,
    })
  }

  render() {
    return `
     <div class='message-item'>
      {{#if isMine}}
        <div class='message-item__body message-item__body_type_mine'>
      {{else}}
        <div class='message-item__body'>
      {{/if}}

        {{#if content}}
          <img src={{contentImg}} alt='Полученное изображение'>
        {{else}}
          <p class='message-item__text text-style'>{{message}}</p>
        {{/if}}

        <div class='message-item__info'>
          {{#if isMine}}
            <img
              src={{msgReceivedIcon}}
              alt='Сообщение полученно'
              class='message-item__icon'
            />
            <p
            class='message-item__data text-style text-style_color_blue text-style_size_12'
          >{{date}}</p>
          {{else}}
          <p
            class='message-item__data text-style text-style_color_gray text-style_size_12'
          >{{date}}</p>
          {{/if}}
        </div>
      </div>
    </div>
    `
  }
}
