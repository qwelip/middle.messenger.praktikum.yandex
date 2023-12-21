import { IUserInfo } from '../models/chat-list'

export const baseUserInfo: IUserInfo[] = [
  {
    dataType: 'Почта',
    data: 'pochta@yandex.ru',
  },
  {
    dataType: 'Логин',
    data: 'ivanivanov',
  },
  {
    dataType: 'Имя',
    data: 'Иван',
  },
  {
    dataType: 'Фамилия',
    data: 'Иванов',
  },
  {
    dataType: 'Телефон',
    data: '+7(909)9673030',
  },
]

export const userInfoMocData: IUserInfo[] = [
  ...baseUserInfo,
  {
    dataType: 'Имя в чате',
    data: 'Иван',
  },
]
