import Block from '../../../../core/block'
import { getFileName } from '../../../../utils/utils'

interface IMessage {
  val: string
}

class Message extends Block {
  constructor(props: IMessage) {
    super('p', {
      ...props,
    })
  }

  render() {
    return `
        <p>{{val}}</p>
      `
  }
}

interface IAddPhotoBtnComponent {
  caption: string
}

export default class AddPhotoBtnComponent extends Block {
  constructor(props: IAddPhotoBtnComponent) {
    super('a', {
      ...props,
      message: new Message({
        val: props.caption,
      }),
    })
  }

  componentDidMount(): void {
    const input = document.getElementById('input') as HTMLInputElement | undefined
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    input?.addEventListener('change', (e: any) => {
      this.children.message.setProps({ val: getFileName(e.target.value) })
    })
  }

  render() {
    return `
      <label class="input-file text-style_color_blue">
        <input id='input' type="file" name="file">
        {{{ message }}}
      </label>
    `
  }
}
