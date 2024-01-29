import ButtonStringComponent from '../../components/button-string/button-string-component'
import Block from '../../core/block'

export default class Page500 extends Block {
  constructor() {
    super('main', {
      button: new ButtonStringComponent({
        caption: 'Назад к чатам',
        isRed: false,
        page: 'chatPage',
      }),
    })
  }

  render() {
    return `
      <main class='page500 horizontal-centered'>
        <div class='page500__wrapper'>
          <h1 class='page500__title'>500</h1>
          <p class='page500__text'>Мы уже фиксим</p>
          <div class='page500__btn'>
            {{{ button }}}
          </div>
        </div>
      </main>
    `
  }
}
