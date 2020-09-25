let idx = 0;
export default class Line {
    constructor(text) {
        this.text = text;
        this.id = idx++;
    }
    highlight(pattern) {
    }
    isMatch(pattern) {
        if (false) {
            // -- return regexp
        }
        else {
            return this.text.includes(pattern);
        }
    }
    toString() {
        // -- convert to ansi string.
    }
    slice(start, end) {
    }
}
//# sourceMappingURL=Line.js.map