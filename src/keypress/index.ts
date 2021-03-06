
import {
  Mode,
  KohlState,
  KeyMapping
} from '../commons/types.js'

import arrowMappings from './arrows.js'
import signalMappings from './signals.js'
import commandMappings from './commands.js'
import vimMappings from './vim.js'

import {
  Key
} from '../commons/types'

const mappings:KeyMapping = new Map()

mappings.set(() => true, (elem:React.Component, key:Key) => {
  elem.setState((state:Partial<KohlState>) => {
    if (state.mode === Mode.EnterCommand && !key.ctrl && !key.meta) {
      return {
        command: state.command + key.sequence
      }
    }
  })
})

const appMappings = new Map([
  ...arrowMappings,
  ...signalMappings,
  ...commandMappings,
  ...vimMappings,
  ...mappings
])

export default appMappings
