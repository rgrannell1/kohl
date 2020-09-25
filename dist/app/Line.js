let idx = 0;
function isString(pattern) {
    return typeof pattern === 'string';
}
function isRegexp(pattern) {
    return pattern instanceof RegExp;
}
export default class Line {
    constructor(text) {
        this.text = text;
        this.id = idx++;
    }
    highlight(pattern) {
    }
    isMatch(pattern) {
        if (isString(pattern)) {
            return this.text.includes(pattern);
        }
        else if (isRegexp(pattern)) {
            return pattern.test(this.text);
        }
    }
    toString() {
        // -- convert to ansi string.
    }
    slice(start, end) {
    }
}
//# sourceMappingURL=Line.js.map