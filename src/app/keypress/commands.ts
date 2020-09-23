
import {
  Mode,
  KohlProps
} from '../../commons/types.js'

import {
  hasName,
  hasSequence
} from './utils.js'

import { runCommand } from '../run-command.js'

const mappings = new Map()

mappings.set(hasName('return'), (elem:React.Component) => {
  elem.setState((state:KohlProps) => {
    if (state.mode === Mode.EnterCommand) {
      return runCommand(state, state.command)
    }
  })
})

mappings.set(hasName('backspace'), (elem:React.Component) => {
  elem.setState((state:KohlProps) => {
    return {
      command: state.command.slice(0, -1)
    }
  })
})

mappings.set(hasName('escape'), (elem:React.Component) => {
  elem.setState((state:KohlProps) => {
    return {
      mode: Mode.Default,
      command: ''
    }
  })
})

mappings.set(hasName('q'), (elem:React.Component) => {
  elem.setState((state:KohlProps) => {
    if (state.mode === Mode.Default) {
      process.kill(process.pid, 'SIGINT')
    } else if (state.mode === Mode.ShowCommand) {
      return {
        mode: Mode.Default
      }
    } else {
      return {
        command: state.command + 'q'
      }
    }
  })
})

mappings.set(hasSequence('?'), (elem:React.Component) => {

})

mappings.set(hasSequence('/'), (elem:React.Component) => {
  elem.setState((state:KohlProps) => {
    if (state.mode === Mode.Default) {
      return {
        mode: Mode.EnterCommand
      }
    } else if (state.mode === Mode.EnterCommand) {
      return {
        command: state.command + '/'
      }
    }
  })
})


export default mappings
