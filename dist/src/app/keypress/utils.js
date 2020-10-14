export const hasName = (val) => {
    return (key) => {
        return key.name === val;
    };
};
export const hasSequence = (val) => {
    return (key) => {
        return key.sequence === val;
    };
};
const asKeyBinding = (key) => {
    if (!key) {
        return;
    }
    let id = '';
    if (key.ctrl) {
        id += 'ctrl + ';
    }
    if (key.shift) {
        id += 'shift + ';
    }
    if (key.sequence) {
        id += key.sequence;
    }
    else if (key.name) {
        id += key.name;
    }
    return id;
};
export const keypress = (binding) => {
    return (key) => {
        return asKeyBinding(key) === binding;
    };
};
//# sourceMappingURL=utils.js.map