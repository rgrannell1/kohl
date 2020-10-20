import ansi from 'ansi-styles';
export default class LinesFilter {
    constructor({ lines, patterns }) {
        this.lines = lines;
        this.patterns = patterns;
    }
    /**
     * Select lines that match a query
     *
     * @param query the search query to filter-down lines
     */
    filterLines(query) {
        return this.lines.values().filter(line => line.isMatch(query));
    }
    /**
     * Highlight a _horizontal subsection_ of a line of data
     *
     * @param bounds the line-column subsection to display
     * @param line the target line
     * @param opts additional view options
     *
     * @returns an ansi-highlighted line of text
     */
    highlightLine(bounds, line, opts) {
        const { id } = line;
        const { highlight } = this.patterns;
        let text = '';
        if (opts?.showLineNumber) {
            text += `${ansi.inverse.open}${id}${ansi.inverse.close}    `;
        }
        text += line.highlight([highlight], bounds.left, bounds.right);
        return { text, id };
    }
    /**
     * Format the lines to be displayed
     *
     * @param bounds the line-column subsection to display
     * @param opts additional options that affect how lines are displayed
     *
     * @returns a list of formatted lines
     */
    formatLines(bounds, opts) {
        return this.filterLines(this.patterns.search)
            .slice(bounds.top, bounds.bottom)
            .map(data => this.highlightLine(bounds, data, opts));
    }
    /**
     * How many unfiltered lines are there in the LinesFilter?
     */
    total() {
        return this.lines.size();
    }
    /**
     * How many lines match the provided search pattern?
     */
    selected() {
        return this.filterLines(this.patterns.search).length;
    }
}
//# sourceMappingURL=LinesFilter.js.map