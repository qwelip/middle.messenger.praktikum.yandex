import { expect } from 'chai'
import Sinon from 'sinon'
import Block from './block'

type IProps = {
  text: string
}

describe('Block test', () => {
  let TestPage: typeof Block

  before(() => {
    class Page extends Block {
      constructor(tagName: string, props: IProps) {
        super(tagName, { ...props })
      }
      render() {
        return `
        <div data-setevent class=''> 
            <p id="test-text" class=''>{{text}}</p>
        </div>
        `
      }
    }
    TestPage = Page
  })

  it('Компонент создается из конструктора', () => {
    const text = 'Hello'
    const pageComponent = new TestPage('div', { text })
    const spanText = pageComponent.element?.querySelector('#test-text')?.innerHTML
    expect(spanText).to.be.eq(text)
  })
  it('Компонент изменяет свое состояние', () => {
    const text = 'new value'
    const pageComponent = new TestPage('div', { text: 'Hello' })
    pageComponent.setProps({ text })
    const spanText = pageComponent.element?.querySelector('#test-text')?.innerHTML
    expect(spanText).to.be.eq(text)
  })
  it('Компонент должен установить события на элемент', () => {
    const handlerStub = Sinon.stub()
    const pageComponent = new TestPage('div', {
      events: {
        click: handlerStub,
      },
    })
    const event = new MouseEvent('click')
    pageComponent.element?.dispatchEvent(event)
    // eslint-disable-next-line no-unused-expressions
    expect(handlerStub.calledOnce).to.be.true
  })
})
