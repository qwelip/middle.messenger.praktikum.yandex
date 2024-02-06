import { PlainObject } from '../models/data-models'

export const addOpenPopupHandle = (
  btnClass: string,
  popupClass: string,
  img: string,
  imgActive: string
): void => {
  const hideClass = `${popupClass}_hidden`
  const btn = document.querySelector(`.${btnClass}`)
  const popup = document.querySelector(`.${popupClass}`)

  if (!btn || !popup) return

  btn.addEventListener('click', () => {
    if (btn.getAttribute('src') === img) {
      btn.setAttribute('src', imgActive)
      popup.classList.remove(hideClass)
    } else {
      btn.setAttribute('src', img)
      popup.classList.add(hideClass)
    }
  })
}

export function isPlainObject(value: unknown): value is PlainObject {
  return (
    typeof value === 'object' &&
    value !== null &&
    value.constructor === Object &&
    Object.prototype.toString.call(value) === '[object Object]'
  )
}

export function isArray(value: unknown): value is [] {
  return Array.isArray(value)
}

export function isArrayOrObject(value: unknown): value is [] | PlainObject {
  return isPlainObject(value) || isArray(value)
}

export function isObjectsEqual(lhs: PlainObject, rhs: PlainObject) {
  if (Object.keys(lhs).length !== Object.keys(rhs).length) {
    return false
  }

  for (const [key, value] of Object.entries(lhs)) {
    const rightValue = rhs[key]
    if (isArrayOrObject(value) && isArrayOrObject(rightValue)) {
      if (isObjectsEqual(value as PlainObject, rightValue as PlainObject)) {
        continue
      }
      return false
    }

    if (value !== rightValue) {
      return false
    }
  }

  return true
}

export const getFileName = (val: string): string => val.split('\\').at(-1)!

export const getTime = (val: string) => {
  const hours = String(new Date(Date.parse(val)).getHours())
  const minutes = String(new Date(Date.parse(val)).getMinutes())
  const withZeroHours = hours.length === 1 ? `0${hours}` : hours
  const withZeroMinutes = minutes.length === 1 ? `0${minutes}` : minutes
  return `${withZeroHours}:${withZeroMinutes}`
}
