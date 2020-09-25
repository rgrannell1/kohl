
import {
  KohlProps,
  KeyMapping
} from '../../commons/types.js'

import { hasName } from './utils.js'
import LinesFilter from '../LinesFilter.js'

const mappings:KeyMapping = new Map()

mappings.set(hasName('up'), (elem:React.Component) => {
  elem.setState((state:KohlProps) => {
    return {
      cursor: {
        position: Math.max(state.cursor.position - 1, 0),
        column: state.cursor.column
      }
    }
  })
})

mappings.set(hasName('down'), (elem:React.Component) => {
  elem.setState((state:KohlProps) => {
    const filter = new LinesFilter(state)
    const bottom = filter.selected() - state.screen.rows

    return {
      cursor: {
        position: Math.min(state.cursor.position + 1, bottom),
        column: state.cursor.column
      }
    }
  })
})

mappings.set(hasName('right'), (elem:React.Component) => {
  elem.setState((state:KohlProps) => {
    return {
      cursor: {
        position: state.cursor.position,
        column: state.cursor.column + 2
      }
    }
  })
})

mappings.set(hasName('left'), (elem:React.Component) => {
  elem.setState((state:KohlProps) => {
    return {
      cursor: {
        position: state.cursor.position,
        column: Math.max(state.cursor.column - 2, 0)
      }
    }
  })
})

mappings.set(hasName('pagedown'), (elem:React.Component) => {
  elem.setState((state:KohlProps) => {
    const filter = new LinesFilter(state)
    const bottom = filter.selected() - state.screen.rows

    return {
      cursor: {
        ...state.cursor,
        position: Math.min(state.cursor.position + 10, bottom)
      }
    }
  })
})

mappings.set(hasName('pageup'), (elem:React.Component) => {
  elem.setState((state:KohlProps) => {
    return {
      cursor: {
        ...state.cursor,
        position: Math.max(state.cursor.position - 10, 0)
      }
    }
  })
})

export default mappings
