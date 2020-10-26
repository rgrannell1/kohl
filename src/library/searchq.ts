
import {
  KohlState
} from '../commons/types.js'

const search = (state:KohlState):Partial<KohlState> => {
  return {
    output: {
      message: state?.patterns?.search?.toString() || '',
      status: 0,
      state: {}
    }
  }
}

export default Object.assign(search, {
  parameters: 0,
  description: 'show current search patterns'
})
