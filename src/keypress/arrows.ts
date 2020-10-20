
import {
  KeyMapping
} from '../commons/types.js'

import {
  keyHandler
  , hasName } from './utils.js'

import LinesFilter from '../app/LinesFilter.js'

const mappings:KeyMapping = new Map()

mappings.set(hasName('up'), keyHandler(state => {
  return {
    cursor: {
      position: Math.max(state.cursor.position - 1, 0),
      column: state.cursor.column
    }
  }
}))

mappings.set(hasName('down'), keyHandler(state => {
  const filter = new LinesFilter(state)
  const bottom = Math.max(filter.selected() - state.screen.rows, 0)

  return {
    cursor: {
      position: Math.min(state.cursor.position + 1, bottom),
      column: state.cursor.column
    }
  }
}))

mappings.set(hasName('right'), keyHandler(state => {
  return {
    cursor: {
      position: state.cursor.position,
      column: state.cursor.column + 2
    }
  }
}))

mappings.set(hasName('left'), keyHandler(state => {
  return {
    cursor: {
      position: state.cursor.position,
      column: Math.max(state.cursor.column - 2, 0)
    }
  }
}))

mappings.set(hasName('pagedown'), keyHandler(state => {
  const filter = new LinesFilter(state)
  const bottom = filter.selected() - state.screen.rows

  return {
    cursor: {
      ...state.cursor,
      position: Math.min(state.cursor.position + 10, bottom)
    }
  }
}))

mappings.set(hasName('pageup'), keyHandler(state => {
  return {
    cursor: {
      ...state.cursor,
      position: Math.max(state.cursor.position - 10, 0)
    }
  }
}))

export default mappings
