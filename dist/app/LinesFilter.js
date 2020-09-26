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
        return this.lines.values().filter(this.isMatch.bind(this));
    }
    // -- TODO code bottleneck
    displayLines(bounds) {
        return this.matchingLines()
            .slice(bounds.top, bounds.bottom)
            .map(data => {
            const { id } = data;
            const { highlight } = this.patterns;
            const text = data.highlight([highlight], bounds.left, bounds.right);
            return { text, id };
        });
    }
    total() {
        return this.lines.size();
    }
    selected() {
        return this.matchingLines().length;
    }
}
//# sourceMappingURL=LinesFilter.js.map