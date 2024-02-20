import Sinon, { SinonFakeServer } from 'sinon'
import { expect } from 'chai'
import CustomFetch from './custom-fetch'

describe('HttpTransport', () => {
  let server: SinonFakeServer

  beforeEach(() => {
    server = Sinon.useFakeServer()
  })

  afterEach(() => {
    server.restore()
  })

  it('Корректное преобразование get параметров', () => {
    const myFetch = new CustomFetch('/test')
    const testUrl = 'https://ya-praktikum.tech/api/v2/test?a=1&b=2'
    const data = { a: 1, b: 2 }

    myFetch.get('/', {
      headers: {
        'Content-Type': 'application/json; charset=UTF-8',
      },
      data: JSON.stringify(data),
    })
    const request = server.requests[0]

    setTimeout(() => {
      expect(request?.url).to.equal(testUrl)
    }, 200)
  })
})
