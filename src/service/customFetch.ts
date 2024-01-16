interface IOptions {
  timeout: number;
  headers: Record<string, string>;
  method: "GET" | "POST" | "PUT" | "DELETE";
  data: Document | XMLHttpRequestBodyInit | null | undefined;
}

const t = () => {};

function queryStringify(data: Record<string, string>) {
  if (typeof data !== "object") {
    throw new Error("Data must be object");
  }

  const keys = Object.keys(data);
  return keys.reduce((result, key, index) => {
    return `${result}${key}=${data[key]}${index < keys.length - 1 ? "&" : ""}`;
  }, "?");
}

class HTTPTransport {
  get = (url: string, options: IOptions) => {
    return this.request(url, { ...options, method: "GET" }, options.timeout);
  };
  post = (url: string, options: IOptions) => {
    return this.request(url, { ...options, method: "POST" }, options.timeout);
  };
  put = (url: string, options: IOptions) => {
    return this.request(url, { ...options, method: "PUT" }, options.timeout);
  };
  delete = (url: string, options: IOptions) => {
    return this.request(url, { ...options, method: "DELETE" }, options.timeout);
  };

  request = (url: string, options: IOptions, timeout = 5000) => {
    const { headers = {}, method, data } = options;
    return new Promise(function (resolve, reject) {
      if (!method) {
        reject("No method");
        return;
      }
      const xhr = new XMLHttpRequest();
      const isGet = method === "GET";
      const getData = data as unknown as Record<string, string>;
      xhr.open(
        method,
        isGet && !!data ? `${url}${queryStringify(getData)}` : url
      );

      Object.keys(headers).forEach((key) => {
        xhr.setRequestHeader(key, headers[key]);
      });

      xhr.onload = function () {
        resolve(xhr);
      };

      xhr.onabort = reject;
      xhr.onerror = reject;

      xhr.timeout = timeout;
      xhr.ontimeout = reject;

      if (isGet || !data) {
        xhr.send();
      } else {
        xhr.send(data);
      }
    });
  };
}
