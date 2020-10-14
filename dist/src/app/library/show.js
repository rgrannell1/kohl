const show = (state, query) => {
    return {
        patterns: {
            ...state.patterns,
            highlight: query
        }
    };
};
export default Object.assign(show, {
    parameters: 1,
    description: 'highlight literal text'
});
//# sourceMappingURL=show.js.map