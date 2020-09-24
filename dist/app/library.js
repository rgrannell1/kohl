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
//# sourceMappingURL=library.js.map