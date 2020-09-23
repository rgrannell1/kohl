
import {
  Mode,
  KohlProps
} from '../commons/types.js'

import {float, string, whitespace} from "parjs"
import {between, manySepBy} from "parjs/combinators"

namespace ops {
  export const undo = () => {}
  export const redo = () => {}

  export const select = () => {}
  export const selectNot = () => {}

  export const show = () => {}
  export const showNot = () => {}

  export const jumpLine = () => {}
  export const jumpHighlight = () => {}

  export const forward = () => {}
  export const backward = () => {}
}

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

}

export const runCommand = (state:KohlProps, command:string) => {
  return {
    mode: Mode.ShowCommand,
    command
  }
}
