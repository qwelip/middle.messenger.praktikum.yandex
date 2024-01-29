import Block from '../../../../../../core/block'
import images from '../../../../../../utils/import-img'
import PopupDialogHeaderComponent from '../popup-dialog-header/popup-dialog-header-component'

interface IProps {
  name: string
  contextMenuIcon: string
}

export default class DialogHeaderComponent extends Block {
  constructor(props: IProps) {
    super('div', {
      ...props,
      popupDialog: new PopupDialogHeaderComponent({
        addIcon: images.addIcon,
        deleteIcon: images.deleteIcon,
      }),
    })
  }

  render() {
    return `
      <div class='dialog-header'>
        <div class='dialog-header__info'>
          <div class='dialog-header__avatar'></div>
          <p class='dialog-header__name text-style text-style_type_bold'>{{name}}</p>
        </div>
        <a class='dialog-header__context-btn btn-styles'>
          <img
            class='dialog-header__btn-img'
            src={{contextMenuIcon}}
            alt='Контекстное меню'
          />
          {{{ popupDialog }}}
        </a>
      </div>
    `
  }
}
