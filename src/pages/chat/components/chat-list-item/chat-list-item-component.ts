import Block from '../../../../core/block'

interface IProps {
  isSelected: boolean
  name: string
  date: string
  message: string
  unreadMsg?: number
  onClick: () => void
}

export default class ChatListItemComponent extends Block {
  constructor(props: IProps) {
    super('div', {
      ...props,
      events: {
        click: () => props.onClick(),
      },
    })
  }

  render() {
    return `
      {{#if isSelected}}
      <div data-setevent class='chat-list-item chat-list-item_selected' page='page404'>
        {{else}}
      <div data-setevent class='chat-list-item' page='page404'>
      {{/if}}

        {{#if unreadMsg}}
          <p class='chat-list-item__counter'>
            {{unreadMsg}}
          </p>
        {{/if}}
        <div class='chat-list-item__avatar' page='page404'></div>
        <div class='chat-list-item__content' page='page404'>
          <div class='chat-list-item__info' page='page404'>
            <p
              class='chat-list-item__name text-style text-style_type_bold' page='page404'
            >{{name}}</p>
            <p
              class='chat-list-item__date text-style text-style_color_gray text-style_size_12' page='page404'
            >{{date}}</p>
          </div>
          <p class='chat-list-item__message text-style text-style_color_gray' page='page404'>
            {{message}}
          </p>
        </div>
      </div>
    `
  }
}
