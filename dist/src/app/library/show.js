const show = (state, query) => {
    const newFile = { ...state.file };
    newFile.patterns.highlight = query;
    return {
        file: newFile
    };
};
export default Object.assign(show, {
    parameters: 1,
    description: 'highlight literal text'
});
//# sourceMappingURL=show.js.map