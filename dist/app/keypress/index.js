import { Mode } from '../../commons/types.js';
import arrowMappings from './arrows.js';
import signalMappings from './signals.js';
import commandMappings from './commands.js';
import vimMappings from './vim.js';
const mappings = new Map();
mappings.set(() => true, (elem, key) => {
    elem.setState((state) => {
        if (state.mode === Mode.EnterCommand && !key.ctrl && !key.meta) {
            return {
                command: state.command + key.sequence
            };
        }
    });
});
const appMappings = new Map([
    ...arrowMappings,
    ...signalMappings,
    ...commandMappings,
    ...vimMappings,
    ...mappings
]);
export default appMappings;
