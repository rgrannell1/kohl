import { Mode } from '../commons/types.js';
var ops;
(function (ops) {
    ops.undo = () => { };
    ops.redo = () => { };
    ops.select = () => { };
    ops.selectNot = () => { };
    ops.show = () => { };
    ops.showNot = () => { };
    ops.jumpLine = () => { };
    ops.jumpHighlight = () => { };
    ops.forward = () => { };
    ops.backward = () => { };
})(ops || (ops = {}));
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
const parseCommand = (command) => {
};
export const runCommand = (state, command) => {
    return {
        mode: Mode.ShowCommand,
        command
    };
};
