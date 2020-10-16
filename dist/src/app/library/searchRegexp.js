const searchRegexp = (state, query) => {
    const newFile = { ...state.file };
    newFile.patterns.search = query;
    return {
        file: newFile
    };
};
export default Object.assign(searchRegexp, {
    parameters: 1,
    description: 'search for regexp'
});
//# sourceMappingURL=searchRegexp.js.map