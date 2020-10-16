const show = (state) => {
    return {
        output: {
            message: state.file?.patterns?.highlight?.toString() || '',
            status: 0,
            state: {}
        }
    };
};
export default Object.assign(show, {
    parameters: 0,
    description: 'show current highlight patterns'
});
//# sourceMappingURL=showq.js.map