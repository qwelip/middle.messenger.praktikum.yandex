enum ReqMethods {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE',
}

interface IRequestBase {
  headers?: Record<string, string>
  data?: Document | XMLHttpRequestBodyInit | null
}

interface IRequestOptions extends IRequestBase {
  method: ReqMethods
}

interface IMethodOptions extends IRequestBase {
  timeout?: number
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type HTTPMethod = (url: string, options?: IMethodOptions) => Promise<any>

function queryStringify(data: Record<string, string>) {
  if (typeof data !== 'object') {
    throw new Error('Data must be object')
  }

  const keys = Object.keys(data)
  return keys.reduce(
    (result, key, index) => `${result}${key}=${data[key]}${index < keys.length - 1 ? '&' : ''}`,
    '?'
  )
}

export default class CustomFetch {
  private _url: string

  constructor(url: string) {
    this._url = `https://ya-praktikum.tech/api/v2${url}`
  }

  get: HTTPMethod = (url, options) =>
    this.request(url, { ...options, method: ReqMethods.GET }, options?.timeout)
  post: HTTPMethod = (url, options) =>
    this.request(url, { ...options, method: ReqMethods.POST }, options?.timeout)
  put: HTTPMethod = (url, options) =>
    this.request(url, { ...options, method: ReqMethods.PUT }, options?.timeout)
  delete: HTTPMethod = (url, options) =>
    this.request(url, { ...options, method: ReqMethods.DELETE }, options?.timeout)

  request = (url: string, options: IRequestOptions, timeout = 5000) => {
    const { headers = {}, method, data } = options
    const resUrl = `${this._url}${url}`
    return new Promise((resolve, reject) => {
      if (!method) {
        reject()
        throw new Error('No method')
      }
      const xhr = new XMLHttpRequest()
      const isGet = method === 'GET'
      const getData = data as unknown as Record<string, string>
      xhr.open(method, isGet && !!data ? `${resUrl}${queryStringify(getData)}` : resUrl)

      Object.keys(headers).forEach((key) => {
        xhr.setRequestHeader(key, headers[key])
      })

      // eslint-disable-next-line func-names
      xhr.onload = function () {
        resolve(xhr)
      }

      xhr.onabort = reject
      xhr.onerror = reject
      xhr.withCredentials = true
      xhr.timeout = timeout
      xhr.ontimeout = reject

      if (isGet || !data) {
        xhr.send()
      } else {
        xhr.send(data)
      }
    })
  }
}
