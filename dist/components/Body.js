import React from 'react';
import ink from 'ink';
import { nanoid } from 'nanoid';
const { Text } = ink;
import FilterLines from '../app/filter-lines.js';
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
    render() {
        const { cursor, lines, screen, patterns } = this.props;
        const filter = new FilterLines({
            lines,
            patterns
        });
        const lower = cursor.position + this.freeLines(screen);
        const elems = [];
        const displayLines = filter.matchingLines(cursor)
            .slice(cursor.position, lower);
        if (displayLines.length === 0) {
            elems.push(React.createElement(Text, { key: nanoid(), inverse: true }, "No Matches Found"));
            for (let ith = 0; ith < this.freeLines(screen) - 1; ++ith) {
                elems.push(React.createElement(Text, { key: nanoid() }, " "));
            }
        }
        else {
            for (let ith = 0; ith < displayLines.length; ++ith) {
                const { text, id } = displayLines[ith];
                const isSelected = ith === 0;
                const trimmed = this.trimLine(text, cursor, screen);
                elems.push(React.createElement(Text, { key: id, inverse: isSelected }, trimmed));
            }
        }
        return React.createElement(React.Fragment, null, elems);
    }
}
//# sourceMappingURL=Body.js.map