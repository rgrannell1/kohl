
import {
  Mode,
  KohlProps
} from '../../commons/types.js'

import { hasSequence } from './utils.js'

const mappings = new Map()

mappings.set(hasSequence('G'), (elem:React.Component) => {
  elem.setState((state:KohlProps) => {
    if (state.mode === Mode.Default) {
      return {
        cursor: {
          ...state.cursor,
          position: state.selection.total - state.screen.rows + 5
        }
      }
    } else if (state.mode === Mode.EnterCommand) {
      return {
        command: state.command + 'G'
      }
    }
  })
})

mappings.set(hasSequence('g'), (elem:React.Component) => {
  elem.setState((state:KohlProps) => {
    if (state.mode === Mode.Default) {
      return {
        cursor: {
          ...state.cursor,
          position: 0
        }
      }
    } else if (state.mode === Mode.EnterCommand) {
      return {
        command: state.command + 'g'
      }
    }
  })
})

export default mappings
