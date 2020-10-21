import React from 'react';
import readline from 'readline';
import * as tty from 'tty';
import * as fs from 'fs';
import split from 'split';
import through from 'through';
import { Header } from './Header.js';
import { Footer } from './Footer.js';
import { Body } from './Body.js';
import CircularBuffer from '../commons/circular-buffer.js';
import mappings from '../keypress/index.js';
import { Mode } from '../commons/types.js';
import ink from 'ink';
import Line from '../app/Line.js';
const { Newline } = ink;
const ttyReadStream = () => {
    const fd = fs.openSync('/dev/tty', 'r+');
    return new tty.ReadStream(fd, {});
};
export class Kohl extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            ...Kohl.defaultState('stdin', new CircularBuffer(Kohl.MAX_LINES)),
            ttyIn: ttyReadStream(),
            fileStore: new Map()
        };
    }
    /**
     * Initialise default state for Kohl
     *
     * React "helpfully" doesn't like nested state objects, so this state is a mess. Rather than using a File
     * object to capture file information, we snapshot states into fileStore before switching to another file
     * stored in fileStore.
     *
     * @param fileId a human-readable ID for the file
     * @param lines a circular buffer containing line data
     *
     * @returns
     */
    static defaultState(fileId, lines) {
        return {
            screen: {
                rows: process.stdout.rows,
                columns: process.stdout.columns
            },
            fileId,
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
            lines,
            lineId: 0
        };
    }
    readKeyStrokes() {
        readline.emitKeypressEvents(this.state.ttyIn);
        this.state.ttyIn.on('keypress', this.handleKeyPress.bind(this));
        this.state.ttyIn.setRawMode(true);
    }
    ingestLine(line, state) {
        state.lines.add(new Line(line));
        return {
            console: {
                rows: process.stdout.rows,
                columns: process.stdout.columns
            },
            lines: state.lines,
            lineId: state.lineId + 1
        };
    }
    readStdin() {
        process.stdin
            .pipe(split())
            .pipe(through(line => {
            this.state.lines.add(new Line(line));
        }))
            .on('end', () => {
            this.setState({
                lineId: this.state.lineId + 1
            });
        });
    }
    clearOnResizing() {
        // -- TODO find an unmount, find a more efficient method.
        const pid = setInterval(() => {
            const rows = process.stdout.rows;
            const columns = process.stdout.columns;
            if (rows !== this.state.screen.rows || columns !== this.state.screen.columns) {
                console.clear();
                this.forceUpdate();
            }
            if (typeof rows === 'undefined') {
                throw new TypeError('stdout-rows count not defined; are you piping stdout to a file or program?');
            }
            if (typeof columns === 'undefined') {
                throw new TypeError('stdout-columns count not defined; are you piping stdout to a file or program?');
            }
            this.setState({
                screen: { rows, columns }
            });
        }, 500);
    }
    componentDidMount() {
        this.readKeyStrokes();
        this.readStdin();
        this.clearOnResizing();
    }
    componentWillUnmount() {
        this.state.ttyIn.removeListener('keypress', this.handleKeyPress);
    }
    handleKeyPress(_, key) {
        for (const [pred, handler] of mappings.entries()) {
            if (pred(key)) {
                return handler(this, key);
            }
        }
        throw new Error(`unhandled key ${key.sequence}`);
    }
    render() {
        const state = this.state;
        return React.createElement(React.Fragment, null,
            React.createElement(Header, { cursor: state.cursor, lines: state.lines, patterns: state.patterns }),
            React.createElement(Body, { cursor: state.cursor, lines: state.lines, screen: state.screen, patterns: state.patterns }),
            React.createElement(Newline, null),
            React.createElement(Footer, { mode: state.mode, output: state.output, command: state.command }));
    }
}
Kohl.MAX_LINES = 20000;
//# sourceMappingURL=Kohl.js.map