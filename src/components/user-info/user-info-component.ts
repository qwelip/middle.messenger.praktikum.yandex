import Block, { IOldNewProps } from '../../core/block'
import { IChageProfileResponse } from '../../models/api-models'
import { IStore, store } from '../../store/store'
import connect from '../../utils/connect'
import UserDataComponent from './components/user-data/user-data-component'

class UserInfoComponent extends Block {
  constructor(tagName: string) {
    super(tagName, {
      email: new UserDataComponent({
        label: 'Почта',
        value: '',
      }),
      login: new UserDataComponent({
        label: 'Логин',
        value: '',
      }),
      firstName: new UserDataComponent({
        label: 'Имя',
        value: '',
      }),
      secondName: new UserDataComponent({
        label: 'Фамилия',
        value: '',
      }),
      displayName: new UserDataComponent({
        label: 'Имя в чате',
        value: '',
      }),
      phone: new UserDataComponent({
        label: 'Телефон',
        value: '',
      }),
    })
  }

  componentDidUpdate({ newProps }: IOldNewProps) {
    if (!newProps.profile) {
      return true
    }
    const user = newProps.profile as IChageProfileResponse | null | undefined
    this.children.email.setProps({ value: user?.email })
    this.children.login.setProps({ value: user?.login })
    this.children.firstName.setProps({ value: user?.first_name })
    this.children.secondName.setProps({ value: user?.second_name })
    this.children.displayName.setProps({ value: user?.display_name || user?.first_name })
    this.children.phone.setProps({ value: user?.phone })
    return false
  }

  componentDidMount(): void {
    const { user } = store.getState()
    this.children.email.setProps({ value: user?.email })
    this.children.login.setProps({ value: user?.login })
    this.children.firstName.setProps({ value: user?.first_name })
    this.children.secondName.setProps({ value: user?.second_name })
    this.children.displayName.setProps({ value: user?.display_name || user?.first_name })
    this.children.phone.setProps({ value: user?.phone })
  }

  render() {
    return `
    <section class='user-info'>
      <ul class='user-info__list list'>
        {{{ email }}}
        {{{ login }}}
        {{{ firstName }}}
        {{{ secondName }}}
        {{{ displayName }}}
        {{{ phone }}}
      </ul>
    </section>
    `
  }
}

function mapToProps(state: IStore) {
  return {
    profile: state.profile,
  }
}

export default connect(UserInfoComponent, mapToProps)
