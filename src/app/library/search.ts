
import {
  KohlProps,
  CommandStatus
} from '../../commons/types.js'

const search = (state:KohlProps, query:string):CommandStatus => {
  const newFile = { ...state.file }
  newFile.patterns.search = query

  return {
    file: newFile
  }
}

export default Object.assign(search, {
  parameters: 1,
  description: 'search for literal text'
})
