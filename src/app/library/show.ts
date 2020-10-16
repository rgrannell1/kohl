

import {
  KohlProps,
  CommandStatus
} from '../../commons/types.js'

const show = (state:KohlProps, query:string):CommandStatus => {
  const newFile = { ...state.file }
  newFile.patterns.highlight = query

  return {
    file: newFile
  }
}

export default Object.assign(show, {
  parameters: 1,
  description: 'highlight literal text'
})
