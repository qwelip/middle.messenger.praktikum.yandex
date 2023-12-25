import { IUserInfo } from '../models/chat-list'

export const baseUserInfo: IUserInfo[] = [
  {
    dataType: 'Почта',
    data: 'pochta@yandex.ru',
    inputName: 'email',
  },
  {
    dataType: 'Логин',
    data: 'ivanivanov',
    inputName: 'login',
  },
  {
    dataType: 'Имя',
    data: 'Иван',
    inputName: 'first_name',
  },
  {
    dataType: 'Фамилия',
    data: 'Иванов',
    inputName: 'second_name',
  },
  {
    dataType: 'Телефон',
    data: '+7(909)9673030',
    inputName: 'phone',
  },
]

export const userInfoMocData: IUserInfo[] = [
  ...baseUserInfo,
  {
    dataType: 'Имя в чате',
    data: 'Иван',
    inputName: 'display_name',
  },
]
