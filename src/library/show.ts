
import {
  KohlState
} from '../commons/types.js'

const show = (state:KohlState, query:string) => {
  return {
    patterns: {
      ...state.patterns,
      highlight: query
    }
  }
}

export default Object.assign(show, {
  parameters: 1,
  description: 'highlight literal text'
})
