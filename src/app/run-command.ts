
import {
  Mode,
  Library,
  KohlProps,
  CommandStatus,
  LanguageParts
} from '../commons/types.js'

import P from 'parsimmon'
import { library } from './library.js'
import { language } from './language.js'

const lang = P.createLanguage(language)

/**
 *
 * @param command
 */
const parseCommand = (command:string) => {
  return lang.Value.tryParse(command)
}

const executeCommand = (parsed:any, libs:Library, state:KohlProps):CommandStatus => {
  if (parsed.type === LanguageParts.Call) {
    const { proc, args } = parsed

    if (!libs[proc]) {
      return {
        message: `unknown procedure "${proc}".`,
        status: 1
      }
    }

    const result = libs[proc](state, ...args)
    try {
      return result
    } catch (err) {
      return {
        status: 1
      }
    }
  }

  return {
    status: 1
  }
}

export const runCommand = (state:KohlProps, command:string) => {
  try {
    const parsed = parseCommand(command)
    const output = executeCommand(parsed, library, state)
    return {
      mode: Mode.ShowCommand,
      command,
      output
    }
  } catch (err) {
    return {
      mode: Mode.ShowCommand,
      command,
      output: {
        status: 1,
        message: err.message.slice(0, 10),
        state: null
      }
    }
  }
}
