import { isString, isRegexp } from '../commons/checks.js';
import { highlightPatterns, formatString } from './highlight-patterns.js';
let idx = 0;
export default class Line {
    constructor(text) {
        this.text = text;
        this.id = idx++;
    }
    isMatch(pattern) {
        if (isString(pattern)) {
            return this.text.includes(pattern);
        }
        else if (isRegexp(pattern)) {
            return pattern.test(this.text);
        }
    }
    highlight(patterns, start, end) {
        const parts = highlightPatterns(this.text, patterns)
            .slice(start, end);
        return formatString(parts);
    }
}
//# sourceMappingURL=Line.js.map