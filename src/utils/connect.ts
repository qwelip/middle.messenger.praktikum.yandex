import Block from '../core/block'
import { IStore, StoreEvents, store } from '../store/store'

export function connect<T extends Record<string, unknown>>(
  Component: typeof Block,
  mapStateToProps: (state: IStore) => IStore
) {
  return class extends Component {
    constructor(tagName: string, args: T) {
      super(tagName, { ...args })

      store.on(StoreEvents.Updated, () => {
        const newState = mapStateToProps(store.getState())
        this.setProps({ ...newState })
      })
    }
  }
}

export default connect
