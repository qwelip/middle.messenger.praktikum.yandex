import Sinon from 'sinon'
import { expect } from 'chai'
import { queryStringify } from './custom-fetch'

describe('HttpTransport', () => {
  afterEach(() => {
    Sinon.restore()
  })
  it('Преобразование get параметров', async () => {
    const baseUrl = 'https://ya-praktikum.tech/api/v2/test'
    const expectedUrl = 'https://ya-praktikum.tech/api/v2/test?a=1&b=2'
    const data = { a: '1', b: '2' }
    const generateQuery = queryStringify(JSON.stringify(data))
    expect(expectedUrl).to.eq(`${baseUrl}${generateQuery}`)
  })
})
