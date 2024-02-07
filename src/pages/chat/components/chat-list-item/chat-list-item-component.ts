import Block from '../../../../core/block'

type IProps = {
  isSelected: boolean
  name: string
  date: string
  message: string
  unreadMsg?: number
  onClick: (e: Event) => void
}

export default class ChatListItemComponent extends Block {
  constructor(tagName: string, props: IProps) {
    super(tagName, {
      ...props,
      events: {
        click: (e) => props.onClick(e),
      },
    })
  }

  render() {
    return `
      {{#if isSelected}}
      <div data-chatId={{chatid}} data-setevent class='chat-list-item chat-list-item_selected'>
        {{else}}
      <div data-chatId={{chatid}} data-setevent class='chat-list-item'>
      {{/if}}

        {{#if unreadMsg}}
          <p class='chat-list-item__counter'>
            {{unreadMsg}}
          </p>
        {{/if}}
        <div data-chatId={{chatid}} class='chat-list-item__avatar'></div>
        <div data-chatId={{chatid}} class='chat-list-item__content'>
          <div data-chatId={{chatid}} class='chat-list-item__info'>
            <p
              data-chatId={{chatid}}
              class='chat-list-item__name text-style text-style_type_bold'
            >{{name}}</p>
            <p
              class='chat-list-item__date text-style text-style_color_gray text-style_size_12'
            >{{date}}</p>
          </div>
          <p data-chatId={{chatid}} class='chat-list-item__message text-style text-style_color_gray'>
            {{message}}
          </p>
        </div>
      </div>
    `
  }
}
