import { isPlainObject } from './utils'

// todom вынести в общие типы
export type Indexed<T = unknown> = {
  [key in string]: T
}

function merge(lhs: Indexed, rhs: Indexed): Indexed {
  for (const p in rhs) {
    if (!Object.prototype.hasOwnProperty.call(rhs, p)) {
      continue
    }
    try {
      if (isPlainObject(rhs[p])) {
        rhs[p] = merge(lhs[p] as Indexed, rhs[p] as Indexed)
      } else {
        lhs[p] = rhs[p]
      }
    } catch (e) {
      lhs[p] = rhs[p]
    }
  }
  return lhs
}

export function setValueToObject(
  object: Indexed | unknown,
  path: string,
  value: unknown
): Indexed | unknown {
  if (typeof object !== 'object' || object === null) {
    return object
  }

  if (typeof path !== 'string') {
    throw new Error('path must be string')
  }

  const result = path.split('.').reduceRight<Indexed>(
    (acc, key) => ({
      [key]: acc,
    }),
    value as Indexed
  )
  return merge(object as Indexed, result)
}
