
import {
  KohlProps
} from '../commons/types.js'

const searchRegexp = (state:KohlProps, query:string) => {
  return {
    patterns: {
      ...state.patterns,
      search: query
    }
  }
}

export default Object.assign(searchRegexp, {
  parameters: 1,
  description: 'search for regexp'
})
