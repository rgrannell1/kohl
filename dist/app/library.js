export const library = {};
library.jump = (state, line) => {
    return {
        status: 0,
        state: {
            cursor: {
                ...state.cursor,
                position: line
            }
        }
    };
};
//# sourceMappingURL=library.js.map