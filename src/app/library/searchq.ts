
import {
  KohlProps,
  KohlState
} from '../../commons/types.js'

const search = (state:KohlProps):Partial<KohlState> => {
  return {
    output: {
      message: state?.patterns?.highlight?.toString() || '',
      status: 0,
      state: {}
    }
  }
}

export default Object.assign(search, {
  parameters: 0,
  description: 'show current search patterns'
})
