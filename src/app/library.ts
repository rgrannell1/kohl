
import {
  KohlProps,
  Library
} from '../commons/types.js'


export const library:Library = { }

library.jump = (state:KohlProps, line:number) => {
  return {
    status: 0,
    state: {
      cursor: {
        ...state.cursor,
        position: line
      }
    }
  }
}
