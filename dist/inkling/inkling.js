import * as tty from 'tty';
import * as fs from 'fs';
import * as stream from 'stream';
import { render } from 'ink-testing-library';
export default class Inkling {
    constructor(component, opts) {
        const fd = fs.openSync('/dev/tty', 'r+');
        this.input = this.stubStdin(); //opts.input || process.stdin
        this.ttyIn = opts.ttyIn || new tty.ReadStream(fd);
        this.component = component({
            input: this.input,
            ttyIn: this.ttyIn
        });
        this.inside = render(this.component);
        this.entries = [];
        return this;
    }
    stubStdin() {
        const self = this;
        const stdin = new stream.Readable();
        stdin.read = function () {
            if (self.entries.length > 0) {
                this.push(self.entries.pop());
            }
            if (self.entries === null) {
                this.push(null);
            }
        };
        return stdin;
    }
    async wait(time) {
        return new Promise(resolve => {
            setTimeout(resolve, time);
        });
    }
    stdin(content) {
        this.entries.push(content);
    }
    async type(sequence) {
        const fd = fs.openSync('/dev/tty', 'r+');
        const writeStream = new tty.WriteStream(fd);
        for (const char in sequence.split('')) {
            await new Promise(resolve => {
                writeStream.write(char, () => {
                    resolve();
                });
            });
        }
    }
}
//# sourceMappingURL=inkling.js.map