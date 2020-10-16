const search = (state, query) => {
    const newFile = { ...state.file };
    newFile.patterns.search = query;
    return {
        file: newFile
    };
};
export default Object.assign(search, {
    parameters: 1,
    description: 'search for literal text'
});
//# sourceMappingURL=search.js.map