import Block from '../../../../../../core/block'

interface IProps {
  addIcon: string
  deleteIcon: string
}

export default class PopupDialogHeaderComponent extends Block {
  constructor(props: IProps) {
    super('div', {
      ...props,
    })
  }

  render() {
    return `
      <div class='popup-dialog-header popup-dialog-header_hidden'>
        <div class='popup-item btn-styles' page='page500'>
          <img
            class='popup-dialog-header_img popup-item__img'
            src={{addIcon}}
            alt='Добавить пользователя'
            page='page500'
          />
          <p class='popup-item__text text-style' page='page500'>Добавить
            пользователя</p>
        </div>
        <div class='popup-item btn-styles' page='page500'>
          <img
            class='popup-dialog-header_img popup-item__img'
            src={{deleteIcon}}
            alt='Удалить пользователя'
            page='page500'
          />
          <p class='popup-item__text text-style' page='page500'>Удалить пользователя</p>
        </div>
      </div>
    `
  }
}
