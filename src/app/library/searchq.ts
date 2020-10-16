
import {
  KohlProps,
  KohlState,
  CommandStatus
} from '../../commons/types.js'

const search = (state:KohlProps):CommandStatus => {
  return {
    output: {
      message: state.file?.patterns?.highlight?.toString() || '',
      status: 0,
      state: {}
    }
  }
}

export default Object.assign(search, {
  parameters: 0,
  description: 'show current search patterns'
})
