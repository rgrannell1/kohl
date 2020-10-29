import React from 'react';
import { Inkling } from '@rgrannell/inkling';
import { Kohl } from '../src/components/Kohl.js';
import CircularBuffer from '../src/commons/circular-buffer.js';
import Line from '../src/app/Line.js';
/**
 * Construct a lines buffer from text lines.
 *
 * @param lines
 */
export const createLines = (lines) => {
    const buff = new CircularBuffer(100);
    for (const line of lines) {
        buff.add(new Line(line));
    }
    return buff;
};
export const expectedBody = (cursor, lines) => {
    //  const expected = []
    //  return expected
};
export class KohlInking extends Inkling {
    constructor() {
        super(({ stdin, stdout, ttyIn }) => {
            return React.createElement(Kohl, { ttyIn: ttyIn, lineStream: stdin, outputStream: stdout });
        });
    }
}
//# sourceMappingURL=utils.js.map