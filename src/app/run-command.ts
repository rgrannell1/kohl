
import {
  Mode,
  KohlProps
} from '../commons/types.js'

import P from "parsimmon"

interface Language {
  [key: string]: (p:P.Language) => P.Parser<any>
}

const language:Language = { }

language.Arg = ref => {
  return ref.String
}

language.Call = ref => {
  return P.seq(ref.ProcName, ref.Arg.sepBy(P.optWhitespace))
}

language.ProcName = () => {
  return P.regexp(/[a-zA-Z0-9]+/)
}

language.Number = () => {
  return P.regexp(/[0-9]+/).map(Number)
}

language.String = () => {
  return P.regexp(/\"[^\"]\"/)
}

language.Jump = ref => {
  return P.regexp(/\:[0-9]+/)
    .sepBy(P.optWhitespace)
    .map(data => {
      return {
        proc: 'jumpLine',
        args: Number(data[0].replace(':', ''))
      }
    })
}

language.Value = ref => {
  return ref.Jump
}

const lang = P.createLanguage(language)

/**
 *   <expr>   :=    <jump> | <call>
 *   <jump>   :=    <number> "k" | <number> "j"
 *   <call>   :=    <proc> <args> ...
 *   <proc>   :=    (<a-zA-Z>|"-") ...
 *   <arg>    :=    <number> | <string>
 *   <number> :=    <0-9> ...
 *   <string> :=    " <any> "
 *
 * @param command
 */
const parseCommand = (command:string) => {
  return lang.Value.tryParse(command)
}

export const runCommand = (state:KohlProps, command:string) => {
  return {
    mode: Mode.ShowCommand,
    command
  }
}
