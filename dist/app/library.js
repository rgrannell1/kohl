import { Mode } from '../commons/types.js';
export const library = {};
// -- refactor to avoid explicit status-codes.
const jump = (state, line) => {
    return {
        cursor: {
            ...state.cursor,
            position: Math.max(line, 0)
        }
    };
};
library.jump = Object.assign(jump, {
    parameters: 1,
    description: 'jump to line-number'
});
const search = (state, query) => {
    return {
        patterns: {
            ...state.patterns,
            search: query
        }
    };
};
library.search = Object.assign(search, {
    parameters: 1,
    description: 'search for literal text'
});
const show = (state, query) => {
    return {
        patterns: {
            ...state.patterns,
            highlight: query
        }
    };
};
library.show = Object.assign(show, {
    parameters: 1,
    description: 'highlight literal text'
});
const showRegexp = (state, query) => {
    try {
        var regexp = new RegExp(query, 'g');
    }
    catch (err) {
        throw new Error('failed to parse regexp');
    }
    return {
        patterns: {
            ...state.patterns,
            highlight: regexp
        }
    };
};
library.showRegexp = Object.assign(showRegexp, {
    parameters: 1,
    description: 'highlight literal text'
});
const q = () => {
    return {
        mode: Mode.Default
    };
};
library.q = Object.assign(q, {
    parameters: 0,
    description: 'quit to the default view'
});
//# sourceMappingURL=library.js.map