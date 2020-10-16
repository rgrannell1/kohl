
import {
  Mode,
  Lines,
  KohlProps,
  KeyMapping
} from '../../commons/types.js'

import CircularBuffer from '../../commons/circular-buffer.js'
import Line from '../../app/Line.js'

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

const loadFile = (content:string) => {
  const lines = content.split('\n')
  const buff = new CircularBuffer<Line>(lines.length)

  for (const line of lines) {
    buff.add(new Line(line))
  }

  return {
    cursor: {
      position: 0,
      cursor: 0
    },
    patterns: {
      search: '',
      highlight: ''
    },
    mode: Mode.Default,
    command: '',
    output: {
      state: {},
      status: 0
    },
    lines: buff,
    displayLines: [],
    lineId: 0
  }
}

const help = `
"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt
in culpa qui officia deserunt mollit anim id est laborum."
`

mappings.set(hasSequence('?'), (elem:React.Component) => {
  // -- this does not seem correct, but replaceState is deprecated.

  const oldState = elem.state as any
  const fileStore = oldState.fileStore

  fileStore.set('stdin', oldState)

  const helpFile = loadFile(help)

  elem.setState(state => {
    console.clear()

    return {
      ...helpFile,
      screen: oldState.screen,
      ttyIn: oldState.ttyIn,
      fileStore: oldState.fileStore
    }
  })
})

export default mappings
