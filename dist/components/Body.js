import React from 'react';
import ink from 'ink';
const { Text } = ink;
export class Body extends React.PureComponent {
    trimLine(line, cursor, screen) {
        const start = cursor.column;
        const end = start + screen.columns;
        return line.slice(start, end).padEnd(1);
    }
    selectDisplayLines(lines, cursor, screen) {
        const occupied = 5;
        const lower = cursor.position + (screen.rows - occupied);
        return lines.slice(cursor.position, lower);
    }
    render() {
        const { cursor, lines, screen } = this.props;
        const elems = [];
        const displayLines = this.selectDisplayLines(lines, cursor, screen);
        for (const { text, id } of displayLines) {
            const isSelected = cursor.position === id;
            const trimmed = this.trimLine(text, cursor, screen);
            elems.push(React.createElement(Text, { key: id, inverse: isSelected }, trimmed));
        }
        return React.createElement(React.Fragment, null, elems);
    }
}
