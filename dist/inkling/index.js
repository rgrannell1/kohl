import Inkling from './inkling.js';
import React from 'react';
import { Kohl } from '../src/components/Kohl.js';
const run = async () => {
    const $ref = new Inkling(({ input, ttyIn }) => React.createElement(Kohl, { lineStream: input, ttyIn: ttyIn }), {});
    $ref.stdin('foo\n');
    $ref.stdin('foo\n');
    $ref.stdin('foo\n');
    console.log($ref.component.getState());
    console.log($ref.inside.lastFrame());
};
run();
//# sourceMappingURL=index.js.map