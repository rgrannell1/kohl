export default class LinesFilter {
    constructor({ lines, patterns }) {
        this.lines = lines;
        this.patterns = patterns;
    }
    isMatch(lineData) {
        return lineData.text.includes(this.patterns.search);
    }
    matchingLines(cursor) {
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
//# sourceMappingURL=lines-filter.js.map