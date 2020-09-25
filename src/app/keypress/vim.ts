
import {
  Mode,
  KohlProps,
  KeyMapping
} from '../../commons/types.js'

import { hasSequence } from './utils.js'
import FilterLines from '../filter-lines.js'

const mappings:KeyMapping = new Map()

mappings.set(hasSequence('G'), (elem:React.Component) => {
  elem.setState((state:KohlProps) => {
    const filter = new FilterLines({
      lines: state.lines
    })

    if (state.mode === Mode.Default) {
      return {
        cursor: {
          ...state.cursor,
          position: filter.total() - state.screen.rows + 5
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
