import React from 'react';
import ink from 'ink';
import { nanoid } from 'nanoid';
const { Text } = ink;
export class Body extends React.PureComponent {
    trimLine(line, cursor, screen) {
        const start = cursor.column;
        const end = start + screen.columns;
        return line.slice(start, end).padEnd(1);
    }
    freeLines(screen) {
        const occupied = 5;
        return screen.rows - occupied;
    }
    selectDisplayLines(lines, cursor, screen, patterns) {
        const lower = cursor.position + this.freeLines(screen);
        return lines
            .values()
            .filter((lineData) => {
            return lineData.text.includes(patterns.search);
        })
            .slice(cursor.position, lower);
    }
    render() {
        const { cursor, lines, screen, patterns } = this.props;
        const elems = [];
        const displayLines = this.selectDisplayLines(lines, cursor, screen, patterns);
        if (displayLines.length === 0) {
            elems.push(React.createElement(Text, { key: nanoid(), inverse: true }, "No Matches Found"));
            for (let ith = 0; ith < this.freeLines(screen) - 1; ++ith) {
                elems.push(React.createElement(Text, { key: nanoid() }, " "));
            }
        }
        else {
            for (let ith = 0; ith < displayLines.length; ++ith) {
                const { text, id } = displayLines[ith];
                // -- highlight the first displayed entry
                const isSelected = ith === 0;
                const trimmed = this.trimLine(text, cursor, screen);
                elems.push(React.createElement(Text, { key: id, inverse: isSelected }, trimmed));
            }
        }
        return React.createElement(React.Fragment, null, elems);
    }
}
//# sourceMappingURL=Body.js.map