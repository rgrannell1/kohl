import { Mode } from '../../commons/types.js';
import { hasSequence } from './utils.js';
import LinesFilter from '../LinesFilter.js';
const mappings = new Map();
mappings.set(hasSequence('G'), (elem) => {
    elem.setState((state) => {
        const filter = new LinesFilter(state.file);
        if (state.mode === Mode.Default) {
            const newFile = { ...state.file };
            newFile.cursor.position = Math.max(filter.total() - state.screen.rows + 5, 0);
            return {
                file: newFile
            };
        }
        else if (state.mode === Mode.EnterCommand) {
            return {
                command: state.command + 'G'
            };
        }
    });
});
mappings.set(hasSequence('g'), (elem) => {
    elem.setState((state) => {
        if (state.mode === Mode.Default) {
            const newFile = { ...state.file };
            newFile.cursor.position = 0;
            return {
                file: newFile
            };
        }
        else if (state.mode === Mode.EnterCommand) {
            return {
                command: state.command + 'g'
            };
        }
    });
});
export default mappings;
//# sourceMappingURL=vim.js.map