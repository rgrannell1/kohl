
import {
  KohlProps,
  CommandStatus
} from '../../commons/types.js'

const showRegexp = (state:KohlProps, query:string):CommandStatus => {
  try {
    var regexp = new RegExp(query, 'g')
  } catch (err) {
    throw new Error('failed to parse regexp')
  }

  const newFile = { ...state.file }
  newFile.patterns.highlight = regexp

  return {
    file: newFile
  }
}

export default Object.assign(showRegexp, {
  parameters: 1,
  description: 'highlight literal text'
})
