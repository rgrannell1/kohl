import { Mode } from '../commons/types.js';
export const library = {};
// -- refactor to avoid explicit status-codes.
library.jump = (state, line) => {
    return {
        cursor: {
            ...state.cursor,
            position: line
        }
    };
};
Object.assign(library.jump, {
    parameters: 1,
    description: 'jump to line.'
});
library.search = (state, search) => {
    return {
        patterns: {
            ...state.patterns,
            search
        }
    };
};
Object.assign(library.search, {
    parameters: 1,
    description: 'search for literal text'
});
library.q = () => {
    return {
        mode: Mode.Default
    };
};
Object.assign(library.q, {
    parameters: 1,
    description: 'quit to the default view'
});
//# sourceMappingURL=library.js.map