import React from 'react';
import ink from 'ink';
import { nanoid } from 'nanoid';
const { Text } = ink;
import LinesFilter from '../app/LinesFilter.js';
export class Body extends React.PureComponent {
    trimLine(line, cursor, screen) {
        const start = cursor.column;
        const end = start + screen.columns;
        return line.slice(start, end).padEnd(1);
    }
    freeLines(screen) {
        return screen.rows - Body.OCCUPIED_VERTICAL_LINES;
    }
    getBounds(cursor, screen) {
        // -- note neesd to be patched
        if (typeof cursor.column === 'undefined') {
            cursor;
        }
        return {
            left: cursor.column,
            right: cursor.column + screen.columns,
            top: cursor.position,
            bottom: cursor.position + this.freeLines(screen)
        };
    }
    render() {
        const { cursor, lines, screen, patterns } = this.props;
        const filter = new LinesFilter({
            lines,
            patterns
        });
        const elems = [];
        const displayLines = filter.displayLines(this.getBounds(cursor, screen), {
            showLineNumber: true
        });
        if (displayLines.length === 0) {
            elems.push(React.createElement(Text, { key: nanoid(), inverse: true }, "No Matches Found"));
            const fillCount = this.freeLines(screen) - 1;
            for (let ith = 0; ith < fillCount; ++ith) {
                elems.push(React.createElement(Text, { key: nanoid() }, " "));
            }
        }
        else {
            for (let ith = 0; ith < displayLines.length; ++ith) {
                const { text, id } = displayLines[ith];
                const isSelected = ith === 0;
                const trimmed = text.length === 0
                    ? ' '
                    : text;
                elems.push(React.createElement(Text, { key: id, inverse: isSelected }, trimmed));
            }
        }
        return React.createElement(React.Fragment, null, elems);
    }
}
Body.OCCUPIED_VERTICAL_LINES = 5;
//# sourceMappingURL=Body.js.map