
import {
  KohlProps
} from '../../commons/types.js'

const search = (state:KohlProps, query:string) => {
  return {
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
