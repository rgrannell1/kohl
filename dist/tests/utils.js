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
//# sourceMappingURL=utils.js.map