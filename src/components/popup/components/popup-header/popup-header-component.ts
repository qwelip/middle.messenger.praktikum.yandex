import Block from '../../../../core/block'

interface IProps {
  caption: string
}

export default class PopupHeaderComponent extends Block {
  constructor(props: IProps) {
    super('h2', {
      ...props,
    })
  }

  render() {
    return `
        <h2 class='popup__title'>{{ caption }}</h2>
      `
  }
}
