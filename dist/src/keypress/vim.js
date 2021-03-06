import { Mode } from '../commons/types.js';
import { hasSequence, keyHandler } from './utils.js';
import LinesFilter from '../app/LinesFilter.js';
const mappings = new Map();
mappings.set(hasSequence('G'), keyHandler(state => {
    const filter = new LinesFilter(state);
    if (state.mode === Mode.Default) {
        return {
            cursor: {
                ...state.cursor,
                position: Math.max(filter.total() - state.screen.rows + 5, 0)
            }
        };
    }
    else if (state.mode === Mode.EnterCommand) {
        return {
            command: state.command + 'G'
        };
    }
}));
mappings.set(hasSequence('g'), keyHandler(state => {
    if (state.mode === Mode.Default) {
        return {
            cursor: {
                column: state.cursor.column,
                position: 0
            }
        };
    }
    else if (state.mode === Mode.EnterCommand) {
        return {
            command: state.command + 'g'
        };
    }
}));
export default mappings;
//# sourceMappingURL=vim.js.map