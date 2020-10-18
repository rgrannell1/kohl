import { Mode } from '../commons/types.js';
import * as fs from 'fs';
import * as path from 'path';
import CircularBuffer from '../commons/circular-buffer.js';
import Line from '../app/Line.js';
import { fileURLToPath } from 'url';
const __dirname = fileURLToPath(import.meta.url);
export const help = () => {
    const content = fs.readFileSync(path.join(__dirname, '../../files/help.mustache'));
    return content.toString();
};
export const loadFile = (content) => {
    const lines = content.split('\n');
    const buff = new CircularBuffer(lines.length);
    for (const line of lines) {
        buff.add(new Line(line));
    }
    return {
        fileId: 'help',
        cursor: {
            position: 0,
            column: 0
        },
        patterns: {
            search: '',
            highlight: ''
        },
        mode: Mode.Default,
        command: '',
        output: {
            state: {},
            status: 0
        },
        lines: buff,
        lineId: 0
    };
};
//# sourceMappingURL=files.js.map