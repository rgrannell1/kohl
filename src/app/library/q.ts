
import {
  Mode,
  CommandStatus
} from '../../commons/types.js'

const q = ():CommandStatus => {
  return {
    mode: Mode.Default
  }
}

export default Object.assign(q, {
  parameters: 0,
  description: 'quit to the default view'
})
