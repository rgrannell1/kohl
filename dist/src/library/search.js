const search = (state, query) => {
    return {
        lines: state.lines,
        patterns: {
            ...state.patterns,
            search: query
        }
    };
};
export default Object.assign(search, {
    parameters: 1,
    description: 'search for literal text'
});
//# sourceMappingURL=search.js.map