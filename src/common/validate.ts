export const nameValidate = (val: string): boolean => {
  var regex = /[^A-ZА-Яa-zа-я-*]/g
  const res = val.replace(regex, '')
  if (res.length !== val.length) {
    return false
  }
  if (val.length === 1) {
    return false
  }
  if (val[0] !== val[0].toUpperCase()) {
    return false
  }
  if (
    val
      .split('')
      .slice(1)
      .some((i) => i === i.toUpperCase())
  ) {
    return false
  }
  return true
}

export const loginValidate = (val: string): boolean => {
  if (val.length < 3) {
    return false
  }
  var regex = /[^A-Za-z1-9-\_/\*]/g
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

export const passwordRepeateValidate = (repeatePassword: string): boolean => {
  const password: HTMLFormElement = document.querySelector(
    'input[name=password]'
  )!
  console.log(
    'password.value === repeatePassword',
    password.value === repeatePassword
  )
  return password.value === repeatePassword
}

export const phoneValidate = (val: string): boolean => {
  if (val.length < 10 || val.length >= 15) {
    return false
  }
  if (val[0] === '+') {
    if (!Number(val.slice(1))) {
      return false
    }
    return true
  } else {
    if (!Number(val)) {
      return false
    }
    return true
  }
}

export const messageValidate = (val: string): boolean => {
  return val.length > 0
}
