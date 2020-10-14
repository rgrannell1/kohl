const jump = (state, line) => {
    return {
        cursor: {
            ...state.cursor,
            position: Math.max(line, 0)
        }
    };
};
export default Object.assign(jump, {
    parameters: 1,
    description: 'jump to line-number'
});
//# sourceMappingURL=jump.js.map