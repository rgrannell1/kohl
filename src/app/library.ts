
import {
  KohlProps,
  Library
} from '../commons/types.js'

export const library:Library = { }

// -- refactor to avoid explicit status-codes.
library.jump = (state:KohlProps, line:number) => {
  return {
    cursor: {
      ...state.cursor,
      position: line
    }
  }
}

Object.assign(library.jump, {
  parameters: 1,
  description: 'jump to line.'
})

library.search = (state:KohlProps, search:string) => {
  return {
    patterns: {
      ...state.patterns,
      search
    }
  }
}

Object.assign(library.search, {
  parameters: 1,
  description: 'search for literal text'
})
