import tap from 'tap';
import React from 'react';
import { render } from 'ink-testing-library';
import { SelectionSummary } from '../src/components/Header.js';
import CircularBuffer from '../src/commons/circular-buffer.js';
import Line from '../src/app/Line.js';
const cases = [];
// -- empty case
cases.push({
    lines: [],
    patterns: {},
    output: '0 / 0 (100%)'
});
// -- lines but no matching patterns
cases.push({
    lines: ['a', 'b', 'c'],
    patterns: {
        search: 'd',
        highlight: ''
    },
    output: '0 / 3 (0%)'
});
// -- single match
cases.push({
    lines: ['a', 'b', 'c'],
    patterns: {
        search: 'a',
        highlight: ''
    },
    output: '1 / 3 (33%)'
});
// -- all match
cases.push({
    lines: ['a', 'a', 'a'],
    patterns: {
        search: 'a',
        highlight: ''
    },
    output: '3 / 3 (100%)'
});
/**
 * Construct a lines buffer from text lines.
 *
 * @param lines
 */
const createLines = (lines) => {
    const buff = new CircularBuffer(100);
    for (const line of lines) {
        buff.add(new Line(line));
    }
    return buff;
};
const runTests = () => {
    // -- static tests.
    for (const { lines, patterns, output } of cases) {
        const { lastFrame } = render(React.createElement(SelectionSummary, { lines: createLines(lines), patterns: patterns }));
        tap.equal(lastFrame(), output);
    }
};
//# sourceMappingURL=Header.test.js.map