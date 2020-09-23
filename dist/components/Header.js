import React from 'react';
import ink from 'ink';
const { Box, Text, Newline, } = ink;
class CursorLinePosition extends React.PureComponent {
    render() {
        return React.createElement(Box, { minWidth: 12 },
            React.createElement(Text, null,
                "line ",
                this.props.position));
    }
}
class SelectionSummary extends React.PureComponent {
    ratio(selected, total) {
        return Number.isNaN(selected / total)
            ? 100
            : Math.round((selected / total) * 100);
    }
    render() {
        const { selected, total } = this.props;
        const ratio = this.ratio(selected, total);
        const strings = {
            ratio: ratio.toLocaleString(),
            total: total.toLocaleString(),
            selected: selected.toLocaleString()
        };
        return React.createElement(Text, null,
            strings.selected,
            " / ",
            strings.total,
            " (",
            strings.ratio,
            "%)");
    }
}
export class Header extends React.Component {
    render() {
        return React.createElement(Box, null,
            React.createElement(Box, { minWidth: 8 },
                React.createElement(Text, null,
                    "kohl",
                    React.createElement(Newline, null))),
            React.createElement(CursorLinePosition, { position: this.props.cursor.position }),
            React.createElement(SelectionSummary, { selected: this.props.selection.count, total: this.props.selection.total }));
    }
}
