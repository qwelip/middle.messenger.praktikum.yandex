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
      <div data-setevent class='chat-list-item chat-list-item_selected' page='empyChat'>
        {{else}}
      <div data-setevent class='chat-list-item' page='empyChat'>
      {{/if}}

        {{#if unreadMsg}}
          <p class='chat-list-item__counter'>
            {{unreadMsg}}
          </p>
        {{/if}}
        <div class='chat-list-item__avatar' page='empyChat'></div>
        <div class='chat-list-item__content' page='empyChat'>
          <div class='chat-list-item__info' page='empyChat'>
            <p
              class='chat-list-item__name text-style text-style_type_bold' page='empyChat'
            >{{name}}</p>
            <p
              class='chat-list-item__date text-style text-style_color_gray text-style_size_12' page='empyChat'
            >{{date}}</p>
          </div>
          <p class='chat-list-item__message text-style text-style_color_gray' page='empyChat'>
            {{message}}
          </p>
        </div>
      </div>
    `
  }
}
