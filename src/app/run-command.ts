
import {
  Mode,
  Library,
  KohlProps,
  ExecuteResult,
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

const executeCommand = (parsed:any, libs:Library, state:KohlProps):ExecuteResult => {
  if (parsed.type === LanguageParts.Call) {
    const { proc, args } = parsed

    if (!libs[proc]) {
      return {
        message: `unknown procedure "${proc}".`,
        status: 1,
        state: {}
      }
    }

    try {
      return {
        status: 0,
        state: libs[proc](state, ...args)
      }
    } catch (err) {
      return {
        message: err.message,
        status: 1,
        state: {}
      }
    }
  }

  return {
    status: 1,
    state: {}
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
