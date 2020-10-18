
import * as files from '../files.js'
import {
  Mode,
  KohlProps,
  KeyMapping,
  KohlState
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

  elem.setState((state:KohlState) => {
    const fileStore = state.fileStore

    fileStore.set(state.fileId, state)

    if (state.fileId === 'help') {
      // -- load the previously loaded file.
      return {
        ...fileStore.get('-')
      }
    } else {
      // -- store a reference to the current state
      fileStore.set('-', state)
      return {
        ...files.loadFile(files.help()),
        screen: state.screen,
        ttyIn: state.ttyIn,
        fileStore: state.fileStore,
        lineId: 0
      }
    }
  })
})

export default mappings
