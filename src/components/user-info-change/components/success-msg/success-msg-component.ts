import Block from '../../../../core/block'

interface IProps {
  sucMsg: string
}

export default class SuccessMsgComponent extends Block {
  constructor(props: IProps) {
    super('p', {
      ...props,
    })
  }

  componentDidUpdate(): boolean {
    setTimeout(() => {
      this.setProps({ sucMsg: '' })
    }, 3000)
    return true
  }

  render() {
    return `
      <p class='success-msg text-style text-style_size_12'>
        {{ sucMsg }}
      </p>
    `
  }
}
