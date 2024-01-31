import Block from '../core/block'
import { StoreEvents, store } from '../store/store'
import isEqual from './isEqual'
import { Indexed } from './setValueToObject'

export function connect<T extends Record<string, unknown>>(
  Component: typeof Block,
  mapStateToProps: (state: Indexed) => Indexed
) {
  return class extends Component {
    constructor(tagName: string, args: T) {
      // todm нужно ли добавлять state в args
      let state = mapStateToProps(store.getState())
      super(tagName, { ...args })

      store.on(StoreEvents.Updated, () => {
        console.log('1', 1)
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
