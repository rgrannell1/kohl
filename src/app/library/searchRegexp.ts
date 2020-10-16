
import {
  KohlProps,
  CommandStatus
} from '../../commons/types.js'

const searchRegexp = (state:KohlProps, query:string):CommandStatus => {
  const newFile = { ...state.file }
  newFile.patterns.search = query

  return {
    file: newFile
  }
}

export default Object.assign(searchRegexp, {
  parameters: 1,
  description: 'search for regexp'
})
