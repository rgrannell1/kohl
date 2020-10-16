import tap from 'tap';
import React from 'react';
import { render } from 'ink-testing-library';
import { CursorLinePosition } from '../../src/components/Header.js';
const runSelectionSummaryTests = () => {
    for (let ith = 0; ith < 10; ++ith) {
        let output = `line ${ith}`;
        const { lastFrame } = render(React.createElement(CursorLinePosition, { position: ith }));
        tap.equal(lastFrame(), output);
    }
};
runSelectionSummaryTests();
//# sourceMappingURL=CursorLinePosition.js.map