import Block from '../../../../core/block'
import { getAvatar } from '../../../../services/resources'
import { IStore, store } from '../../../../store/store'
import connect from '../../../../utils/connect'
import ImgComponent from '../img/img-component'

type IProps = {
  avatarPlaceholder: string
  isHover: boolean
}

class AvatarComponent extends Block {
  constructor(tagName: string, props: IProps) {
    super(tagName, {
      ...props,
      image: new ImgComponent({
        imgSrc: props.avatarPlaceholder,
        isNoAvatar: true,
      }),
    })
  }

  componentDidMount() {
    const { avatar, user } = store.getState()
    const avatarSrc = avatar || user?.avatar
    if (avatarSrc) {
      getAvatar(avatarSrc)
        .then((res) => {
          this.children.image.setProps({ isNoAvatar: false })
          this.children.image.setProps({ imgSrc: res?.responseURL })
        })
        .catch((err) => console.log('err', err))
    } else {
      this.children.image.setProps({ isNoAvatar: true })
    }
  }

  render() {
    return `
    <div>
      {{#if isHover}}
      <div data-setevent class='user-avatar__img-wrapper user-avatar__img-wrapper_useHover centered-content'>
        {{{ image }}}
        <p class='user-avatar__change-avatar'>Поменять аватар</p>
      </div>
      {{else}}
      <div data-setevent class='user-avatar__img-wrapper centered-content'>
        {{{ image }}}
      </div>
      {{/if}}
    </div>
    `
  }
}

function mapToProps(state: IStore) {
  return {
    avatar: state.avatar,
    user: state.user,
  }
}

export default connect(AvatarComponent, mapToProps)
