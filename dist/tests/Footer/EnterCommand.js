import tap from 'tap';
import React from 'react';
import { render } from 'ink-testing-library';
import { EnterCommand } from '../../src/components/Footer.js';
const cases = ['testcommand'];
const runEnterCommand = () => {
    for (const command of cases) {
        const { lastFrame } = render(React.createElement(EnterCommand, { command: command }));
        tap.equals(lastFrame(), `> ${command}\n`);
    }
};
runEnterCommand();
//# sourceMappingURL=EnterCommand.js.map