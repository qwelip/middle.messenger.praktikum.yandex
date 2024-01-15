import ButtonStringComponent from '../../components/button-string/button-string-component'
import Block from '../../core/block'

export default class Page404 extends Block {
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
      <main class='page404 horizontal-centered'>
        <div class='page404__wrapper'>
          <h1 class='page404__title'>404</h1>
          <p class='page404__text'>Не туда попали</p>
          <div class='page404__btn'>
            {{{ button }}}
          </div>
        </div>
      </main>
    `
  }
}
