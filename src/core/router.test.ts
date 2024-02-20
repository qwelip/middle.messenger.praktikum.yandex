import { expect } from 'chai'
import { RouterClass } from './router'
import Block from './block'

describe('Router test', () => {
  let TestPage: typeof Block

  before(() => {
    class Page extends Block {
      constructor() {
        super('main', {})
      }
      render() {
        return `
        <div>
        </div>
      `
      }
    }
    TestPage = Page
  })

  it('Переход по страницам', () => {
    const router = new RouterClass('app')
    router.use('/test', TestPage)
    router.go('/test')
    router.go('/test')
    expect(window.history.length).to.eq(3)
  })

  it('Переход на шаг вперед', () => {
    const router = new RouterClass('app')
    router.back()
    expect(window.history.length).to.eq(3)
  })

  it('Переход на шаг назад', () => {
    const router = new RouterClass('app')
    router.forward()
    expect(window.history.length).to.eq(3)
  })
})
