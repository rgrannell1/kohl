
import {
  KohlProps
} from '../commons/types.js'

const show = (state:KohlProps, query:string) => {
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
