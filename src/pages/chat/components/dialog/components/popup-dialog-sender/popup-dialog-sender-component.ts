import Block from '../../../../../../core/block'

interface IProps {
  imgIcon: string
  fileIcon: string
  locationIcon: string
}

export default class PopupDialogSenderComponent extends Block {
  constructor(props: IProps) {
    super('div', {
      ...props,
    })
  }

  render() {
    return `
      <div class='popup-dialog-sender popup-dialog-sender_hidden'>
        <div class='popup-item' page='page500'>
          <img
            class='popup-item__img'
            src={{imgIcon}}
            alt='Фото/видео'
            page='page500'
          />
          <p class='popup-item__text text-style' page='page500'>Фото или Видео</p>
        </div>
        <div class='popup-item' page='page404'>
          <img class='popup-item__img' src={{fileIcon}} alt='Файл' page='page404' />
          <p
            class='popup-item__text text-style'
            page='page404'
            page='page404'
          >Файл</p>
        </div>
        <div class='popup-item' page='page404'>
          <img
            class='popup-item__img'
            src={{locationIcon}}
            alt='Локация'
            page='page404'
          />
          <p class='popup-item__text text-style' page='page404'>Локация</p>
        </div>
      </div>
    `
  }
}
