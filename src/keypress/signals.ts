
import {
  KeyMapping
} from '../commons/types.js'

import {
  keypress
} from './utils.js'

const mappings:KeyMapping = new Map()

mappings.set(keypress('ctrl + c'), () => process.kill(process.pid, 'SIGINT'))
mappings.set(keypress('ctrl + z'), () => process.kill(process.pid, 'SIGSTP'))

export default mappings
