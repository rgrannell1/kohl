
import {
  KohlProps
} from '../../commons/types.js'

import { hasName } from './utils.js'

const mappings = new Map()

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
    return {
      cursor: {
        position: state.cursor.position + 1,
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
    return {
      cursor: {
        ...state.cursor,
        position: state.cursor.position + 10
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
