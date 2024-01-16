import Block from '../../../../../../core/block'

export default class InputSearchComponent extends Block {
  constructor() {
    super('input', {})
  }

  render() {
    return `
      <input class='search-input text-style text-style_color_gray' type='text' placeholder='Поиск'/>
    `
  }
}
