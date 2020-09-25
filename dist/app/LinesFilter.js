// -- merge into a lines class?
export default class LinesFilter {
    constructor({ lines, patterns }) {
        this.lines = lines;
        this.patterns = patterns;
    }
    isMatch(line) {
        return line.isMatch(this.patterns.search);
    }
    matchingLines() {
        return this.lines.values()
            .filter(this.isMatch.bind(this));
    }
    total() {
        return this.lines.size();
    }
    selected() {
        return this.matchingLines().length;
    }
}
//# sourceMappingURL=LinesFilter.js.map