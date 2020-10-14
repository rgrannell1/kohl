const searchRegexp = (state, query) => {
    return {
        patterns: {
            ...state.patterns,
            search: query
        }
    };
};
export default Object.assign(searchRegexp, {
    parameters: 1,
    description: 'search for regexp'
});
//# sourceMappingURL=searchRegexp.js.map