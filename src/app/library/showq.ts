
import {
  KohlProps,
  KohlState,
  CommandStatus
} from '../../commons/types.js'

const show = (state:KohlProps):CommandStatus => {
  return {
    output: {
      message: state.file?.patterns?.highlight?.toString() || '',
      status: 0,
      state: {}
    }
  }
}

export default Object.assign(show, {
  parameters: 0,
  description: 'show current highlight patterns'
})
