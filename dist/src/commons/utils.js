import hash from 'hash-sum';
export const sequenceBy = (pred, coll) => {
    let out;
    if (coll.length === 0) {
        return [];
    }
    else if (coll.length === 1) {
        return [coll];
    }
    else {
        // -- create an initial sequence
        const sequences = [[coll[0]]];
        for (let ith = 1; ith < coll.length; ++ith) {
            const elem = coll[ith];
            // -- the previous target collection.
            const target = sequences[sequences.length - 1];
            const isMatch = pred(target[target.length - 1], elem);
            if (isMatch) {
                target.push(elem);
            }
            else {
                // -- didn't match; group on its own for now.
                sequences.push([elem]);
            }
        }
        out = sequences;
    }
    return out;
};
export function isString(pattern) {
    return typeof pattern === 'string';
}
export function isRegexp(pattern) {
    return pattern instanceof RegExp;
}
export function hashSignature(args) {
    return hash(args);
}
//# sourceMappingURL=utils.js.map