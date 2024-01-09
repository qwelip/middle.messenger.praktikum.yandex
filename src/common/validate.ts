export const nameValidate = (val: string): boolean => {
  var regex = /[^a-zа-я-\/\*]/g
  const res = val.replace(regex, '')
  if (res.length !== val.length) {
    return false
  }
  if (val[0] !== val[0].toUpperCase()) {
    return false
  }
  return true
}

export const loginValidate = (val: string): boolean => {
  if (val.length < 3) {
    return false
  }
  var regex = /[^a-z1-9-\_/\*]/g
  const res = val.replace(regex, '')
  if (res.length !== val.length) {
    return false
  }
  if (Number(val)) {
    return false
  }
  if (val.length > 20) {
    return false
  }
  return true
}

export const emailValidate = (val: string): boolean => {
  const reg =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/g
  return val.match(reg) !== null
}

export const passwordValidate = (val: string): boolean => {
  if (val.length < 8) {
    return false
  }

  const isUpperLetter = val.split('').some((i) => i.toUpperCase() === i)
  const isNumber = val.split('').some((i) => Number(i))

  if (!isUpperLetter && !isNumber) {
    return false
  }

  if (val.length > 40) {
    return false
  }
  return true
}

export const phoneValidate = (val: string): boolean => {
  if (val[0] !== '+' || !Number(val[0])) {
    return false
  }
  if (val.length < 10 || val.length > 15) {
    return false
  }
  if (!Number(val.slice(1))) {
    return false
  }
  return true
}

export const messageValidate = (val: string): boolean => {
  return val.length > 0
}
