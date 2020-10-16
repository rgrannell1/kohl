const search = (state) => {
    return {
        output: {
            message: state.file?.patterns?.highlight?.toString() || '',
            status: 0,
            state: {}
        }
    };
};
export default Object.assign(search, {
    parameters: 0,
    description: 'show current search patterns'
});
//# sourceMappingURL=searchq.js.map