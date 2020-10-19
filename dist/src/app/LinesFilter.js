import ansi from 'ansi-styles';
export default class LinesFilter {
    constructor({ lines, patterns }) {
        this.lines = lines;
        this.patterns = patterns;
    }
    /**
     * Does a line match the search pattern?
     *
     * @param line a candidate line
     */
    isMatch(line) {
        return line.isMatch(this.patterns.search);
    }
    matchingLines() {
        return this.lines.values().filter(this.isMatch.bind(this));
    }
    highlightLine(bounds, data, opts) {
        const { id } = data;
        const { highlight } = this.patterns;
        let text = '';
        if (opts?.showLineNumber) {
            text += `${ansi.inverse.open}${id}${ansi.inverse.close}    `;
        }
        text += data.highlight([highlight], bounds.left, bounds.right);
        return { text, id };
    }
    displayLines(bounds, opts) {
        return this.matchingLines()
            .slice(bounds.top, bounds.bottom)
            .map((data, ith) => this.highlightLine(bounds, data, opts));
    }
    total() {
        return this.lines.size();
    }
    selected() {
        return this.matchingLines().length;
    }
}
//# sourceMappingURL=LinesFilter.js.map