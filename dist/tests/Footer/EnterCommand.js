import tap from 'tap';
import React from 'react';
import { render } from 'ink-testing-library';
import { EnterCommand } from '../../src/components/Footer.js';
const cases = ['testcommand'];
const runEnterCommand = () => {
    for (const command of cases) {
        const { lastFrame } = render(React.createElement(EnterCommand, { command: command }));
        tap.includes(lastFrame(), `> ${command}`);
    }
};
runEnterCommand();
//# sourceMappingURL=EnterCommand.js.map