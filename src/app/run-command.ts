
import {
  Mode,
  KohlProps
} from '../commons/types.js'

import P from 'parsimmon'

interface Language {
  [key: string]: (p:P.Language) => P.Parser<any>
}

const language:Language = { }


language._ = () => {
  return P.regexp(/\s*/)
},
language.__ = () => {
  return P.regexp(/\s+/)
},

language.Arg = ref => {
  return P.alt(ref.String, ref.Number)
}

language.Call = ref => {
  return P.seqMap(
    ref.ProcName,
    ref.__,
    P.sepBy(ref.Arg, P.whitespace),
    (proc, _, args) => {
      return { type: 'call', proc, args }
    }
  )
}

language.ProcName = () => {
  return P.regexp(/[a-zA-Z0-9]+/)
}

language.Number = () => {
  return P.regexp(/[0-9]+/).map(Number)
}

language.String = () => {
  return P.regexp(/\"[^\"]*\"/)
}

language.Jump = ref => {
  return P.regexp(/\:[0-9]+/).map(match => {
    return {
      type: 'jump', // -- todo enum
      line: Number(match.slice(1))
    }
  })
}

language.Value = ref => {
  return P.seqMap(
    ref._,
    P.alt(ref.Call),
    ref._,
    (_0, core, _1) => core)
}

const lang = P.createLanguage(language)

/**
 *
 * @param command
 */
const parseCommand = (command:string) => {
  return lang.Value.tryParse(command)
}

const executeCommand = (parsed:any, state:KohlProps) => {
  // -- invoke against a lib
}

export const runCommand = (state:KohlProps, command:string) => {
  const output = executeCommand(parseCommand(command), state)

  return {
    mode: Mode.ShowCommand,
    command
  }
}
