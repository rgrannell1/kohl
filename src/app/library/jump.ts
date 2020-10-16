
import {
  KohlProps,
  CommandStatus
} from '../../commons/types.js'

const jump = (state:KohlProps, line:number):CommandStatus => {
  const newFile = { ...state.file }
  newFile.cursor.position = Math.max(line, 0)

  return {
    file: newFile
  }
}

export default Object.assign(jump, {
  parameters: 1,
  description: 'jump to line-number'
})
