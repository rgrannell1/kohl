
import * as files from '../files.js'
import {
  Mode,
  KohlProps,
  KeyMapping
} from '../../commons/types.js'

import {
  hasName,
  hasSequence
} from './utils.js'

import { runCommand } from '../run-command.js'

const mappings:KeyMapping = new Map()

mappings.set(hasName('return'), (elem:React.Component) => {
  elem.setState((state:KohlProps) => {
    if (state.mode === Mode.EnterCommand) {
      const result = runCommand(state, state.command)

      if (result.output.status === 0) {
        return {
          ...result,
          command: ''
        }
      } else {
        return result
      }
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
      process.exit(0)
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

mappings.set(hasSequence('/'), (elem:React.Component) => {
  elem.setState((state:KohlProps) => {
    if (state.mode === Mode.Default || state.mode === Mode.ShowCommand) {
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

mappings.set(hasSequence('?'), (elem:React.Component) => {
  // -- this does not seem correct, but replaceState is deprecated.

  const oldState = elem.state as any
  const fileStore = oldState.fileStore

  fileStore.set('stdin', oldState)

  elem.setState(state => {
    console.clear()

    return {
      ...files.loadFile(files.help()),
      screen: oldState.screen,
      ttyIn: oldState.ttyIn,
      fileStore: oldState.fileStore
    }
  })
})

export default mappings
