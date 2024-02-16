import Block from '../../../../core/block'

type IProps = {
  label: string
  value: string
}

export default class UserDataComponent extends Block {
  constructor(props: IProps) {
    super('li', {
      ...props,
    })
  }

  render() {
    return `
    <li class='user-info__list-item list-item'>
      <p class='user-info__text text-style'>{{ label }}</p>
      <p class='user-info__text text-style text-style_gray'>{{ value }}</p>
    </li>
    `
  }
}
