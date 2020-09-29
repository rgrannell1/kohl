
import {
  Mode,
  KohlProps,
  KeyMapping
} from '../../commons/types.js'

import { hasSequence } from './utils.js'
import LinesFilter from '../LinesFilter.js'

const mappings:KeyMapping = new Map()

mappings.set(hasSequence('G'), (elem:React.Component) => {
  elem.setState((state:KohlProps) => {
    const filter = new LinesFilter({
      lines: state.lines,
      patterns: state.patterns
    })

    if (state.mode === Mode.Default) {
      return {
        cursor: {
          ...state.cursor,
          position: Math.max(filter.total() - state.screen.rows + 5, 0)
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
