import Block from '../core/block'
import { IStore, StoreEvents, store } from '../store/store'
import isEqual from './isEqual'

export function connect<T extends Record<string, unknown>>(
  Component: typeof Block,
  mapStateToProps: (state: IStore) => IStore
) {
  return class extends Component {
    constructor(tagName: string, args: T) {
      // todm нужно ли добавлять state в args
      let state = mapStateToProps(store.getState())
      super(tagName, { ...args })

      store.on(StoreEvents.Updated, () => {
        const newState = mapStateToProps(store.getState())
        if (!isEqual(state, newState)) {
          this.setProps({ ...newState })
        }
        state = newState
      })
    }
  }
}

export default connect
