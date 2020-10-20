import React from 'react';
import ink from 'ink';
import LinesFilter from '../app/LinesFilter.js';
const { Box, Text, Newline, } = ink;
export class CursorLinePosition extends React.PureComponent {
    render() {
        return React.createElement(Box, { minWidth: 12 },
            React.createElement(Text, null,
                "line ",
                this.props.position));
    }
}
export class SelectionSummary extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            lineLength: 0
        };
    }
    ratio(selected, total) {
        return total === 0
            ? 100
            : Math.round((selected / total) * 100);
    }
    // -- TODO this is deprecated and should be replaced.
    UNSAFE_componentWillReceiveProps() {
        this.setState({
            lineLength: this.props.lines.size()
        });
    }
    shouldComponentUpdate() {
        // -- pure components perform shallow reference checks, meaning lines can change in length
        // -- without triggering a re-render. This insures a re-render takes place.
        return this.state.lineLength !== this.props.lines.size();
    }
    render() {
        const { lines, patterns } = this.props;
        const filter = new LinesFilter({ lines, patterns });
        const total = filter.total();
        const selected = filter.selected();
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
export class Header extends React.PureComponent {
    render() {
        const { lines, patterns, cursor } = this.props;
        return React.createElement(Box, null,
            React.createElement(Box, { minWidth: 8 },
                React.createElement(Text, null,
                    "kohl",
                    React.createElement(Newline, null))),
            React.createElement(CursorLinePosition, { position: cursor.position }),
            React.createElement(SelectionSummary, { lines: lines, patterns: patterns }));
    }
}
//# sourceMappingURL=Header.js.map