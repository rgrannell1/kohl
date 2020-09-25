
import {
  Mode,
  KohlProps,
  Library
} from '../commons/types.js'

export const library:Library = { }

// -- refactor to avoid explicit status-codes.
const jump = (state:KohlProps, line:number) => {
  return {
    cursor: {
      ...state.cursor,
      position: line
    }
  }
}

library.jump = Object.assign(jump, {
  parameters: 1,
  description: 'jump to line-number'
})

const search = (state:KohlProps, query:string) => {
  return {
    patterns: {
      ...state.patterns,
      search: query
    }
  }
}

library.search = Object.assign(search, {
  parameters: 1,
  description: 'search for literal text'
})

const q = () => {
  return {
    mode: Mode.Default
  }
}

library.q = Object.assign(q, {
  parameters: 0,
  description: 'quit to the default view'
})
