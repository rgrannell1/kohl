import { Mode } from '../../commons/types.js';
import { hasSequence } from './utils.js';
const mappings = new Map();
mappings.set(hasSequence('G'), (elem) => {
    elem.setState((state) => {
        if (state.mode === Mode.Default || true) {
            return {
                cursor: {
                    ...state.cursor,
                    position: state.selection.total - state.screen.rows + 5
                }
            };
        }
    });
});
mappings.set(hasSequence('g'), (elem) => {
    elem.setState((state) => {
        if (state.mode === Mode.Default || true) {
            return {
                cursor: {
                    ...state.cursor,
                    position: 0
                }
            };
        }
    });
});
export default mappings;
