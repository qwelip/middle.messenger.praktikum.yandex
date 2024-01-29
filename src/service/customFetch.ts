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
  timeout: number
}

type HTTPMethod = (url: string, options?: IMethodOptions) => Promise<unknown>

function queryStringify(data: Record<string, string>) {
  if (typeof data !== 'object') {
    throw new Error('Data must be object')
  }

  const keys = Object.keys(data)
  return keys.reduce((result, key, index) => `${result}${key}=${data[key]}${index < keys.length - 1 ? '&' : ''}`, '?')
}

export default class HTTPTransport {
  get: HTTPMethod = (url, options) => this.request(url, { ...options, method: ReqMethods.GET }, options?.timeout)

  post: HTTPMethod = (url, options) => this.request(url, { ...options, method: ReqMethods.POST }, options?.timeout)

  put: HTTPMethod = (url, options) => this.request(url, { ...options, method: ReqMethods.PUT }, options?.timeout)

  delete: HTTPMethod = (url, options) => this.request(url, { ...options, method: ReqMethods.DELETE }, options?.timeout)

  request = (url: string, options: IRequestOptions, timeout = 5000) => {
    const { headers = {}, method, data } = options
    return new Promise((resolve, reject) => {
      if (!method) {
        reject()
        throw new Error('No method')
      }
      const xhr = new XMLHttpRequest()
      const isGet = method === 'GET'
      const getData = data as unknown as Record<string, string>
      xhr.open(method, isGet && !!data ? `${url}${queryStringify(getData)}` : url)

      Object.keys(headers).forEach((key) => {
        xhr.setRequestHeader(key, headers[key])
      })

      // eslint-disable-next-line func-names
      xhr.onload = function () {
        resolve(xhr)
      }

      xhr.onabort = reject
      xhr.onerror = reject

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
