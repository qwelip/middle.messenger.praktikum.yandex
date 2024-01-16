import Block from '../../core/block'

interface IProps {
  data: Record<string, unknown>[]
}

export default class UserInfoComponent extends Block {
  constructor(props: IProps) {
    super('section', {
      ...props,
    })
  }

  render() {
    const data = this.props.data as Record<string, unknown>[]

    const renderItems = () => data
      .map((item) => `
          <li class='user-info__list-item list-item'>
            <p class='user-info__text text-style'>${item.dataType}</p>
            <p class='user-info__text text-style text-style_gray'>${item.data}</p>
          </li>
        `)
      .join('')

    return `
    <section class='user-info'>
      <ul class='user-info__list list'>
        ${renderItems()}
      </ul>
    </section>
    `
  }
}
