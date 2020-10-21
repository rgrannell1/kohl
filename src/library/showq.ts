
import {
  KohlState
} from '../commons/types.js'

const show = (state:KohlState):Partial<KohlState> => {
  return {
    output: {
      message: state?.patterns?.highlight?.toString() || '',
      status: 0,
      state: {}
    }
  }
}

export default Object.assign(show, {
  parameters: 0,
  description: 'show current highlight patterns'
})
