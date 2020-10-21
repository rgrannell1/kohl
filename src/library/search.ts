
import {
  KohlState
} from '../commons/types.js'

const search = (state:KohlState, query:string) => {
  return {
    lines: state.lines,
    patterns: {
      ...state.patterns,
      search: query
    }
  }
}

export default Object.assign(search, {
  parameters: 1,
  description: 'search for literal text'
})
