import Block from '../../../../core/block'
import { changeAvatar } from '../../../../services/user'
import { store } from '../../../../store/store'
import AddPhotoBtnComponent from '../add-photo-btn/add-photo-btn-component'
import ErrorMsgComponent from '../error-msg/error-msg-component'
import PopupHeaderComponent from '../popup-header/popup-header-component'

type IProps = {
  close: () => void
}

export class FormComponent extends Block {
  constructor(props: IProps) {
    super('form', {
      ...props,
      header: new PopupHeaderComponent({
        caption: 'Загрузите файл',
      }),
      addPhotoBtn: new AddPhotoBtnComponent({
        caption: 'Выбрать файл на компьютере',
      }),
      error: new ErrorMsgComponent({
        errorCaption: '',
      }),
    })
  }

  componentDidMount() {
    const form = document.getElementById('avatarForm') as HTMLFormElement | undefined
    const input = document.getElementById('input') as HTMLInputElement | undefined

    form?.addEventListener('submit', async (e: HTMLElementEventMap['submit']) => {
      e.preventDefault()
      const files = input?.files

      if (!files || files.length === 0) {
        this.children.error.setProps({ errorCaption: 'Нужно выбрать файл' })
      } else {
        const formData = new FormData()
        formData.append('avatar', files[0])
        try {
          const res = await changeAvatar(formData)
          store.set('avatar', res?.avatar)
          this.children.error.setProps({ errorCaption: '' })
          const close = this.props.close as () => void
          close()
        } catch (error) {
          if (error instanceof Error) {
            this.children.error.setProps({ errorCaption: error.message })
          }
        }
      }
    })
  }

  render() {
    return `
      <form id='avatarForm' name='avatarForm' class='popup__window horizon-centered-content'>
          {{{ header }}}
          <div class='popup__content'>
            {{{ addPhotoBtn }}}
          </div>
          
          <a data-setevent class='button'>
            <button type='submit' class='button__button'>
              Поменять
            </button>
          </a>
          {{{ error }}}
      </form>
    `
  }
}
