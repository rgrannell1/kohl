const showRegexp = (state, query) => {
    try {
        var regexp = new RegExp(query, 'g');
    }
    catch (err) {
        throw new Error('failed to parse regexp');
    }
    const newFile = { ...state.file };
    newFile.patterns.highlight = regexp;
    return {
        file: newFile
    };
};
export default Object.assign(showRegexp, {
    parameters: 1,
    description: 'highlight literal text'
});
//# sourceMappingURL=showRegexp.js.map