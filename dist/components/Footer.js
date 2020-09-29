import React from 'react';
import ink from 'ink';
const { Box, Text } = ink;
import { Mode } from '../commons/types.js';
export class EnterCommand extends React.PureComponent {
    render() {
        const { command } = this.props;
        return React.createElement(Box, null,
            React.createElement(Text, { inverse: true },
                "> ",
                command));
    }
}
export class ShowCommand extends React.PureComponent {
    render() {
        const { output } = this.props;
        if (output.status === 0) {
            return React.createElement(Box, null,
                React.createElement(Text, { inverse: true }, output.message || '✔️ '));
        }
        else if (output.status === 1) {
            return React.createElement(Box, null,
                React.createElement(Text, { inverse: true },
                    "\u2715 ",
                    output.message));
        }
        else {
            throw 'invalid status code.';
        }
    }
}
export class DefaultFooter extends React.PureComponent {
    render() {
        return React.createElement(Box, null,
            React.createElement(Text, { inverse: true }, "Press / to run command, q to exit, '?' for help"));
    }
}
export class Footer extends React.PureComponent {
    render() {
        const { mode, command, output } = this.props;
        if (mode === Mode.EnterCommand) {
            return React.createElement(EnterCommand, { command: command });
        }
        else if (mode === Mode.ShowCommand) {
            return React.createElement(ShowCommand, { output: output, command: command });
        }
        else {
            return React.createElement(DefaultFooter, null);
        }
    }
}
//# sourceMappingURL=Footer.js.map