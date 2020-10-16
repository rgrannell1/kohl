import { Mode } from '../../commons/types.js';
import CircularBuffer from '../../commons/circular-buffer.js';
import Line from '../../app/Line.js';
import { hasName, hasSequence } from './utils.js';
import { runCommand } from '../run-command.js';
const mappings = new Map();
mappings.set(hasName('return'), (elem) => {
    elem.setState((state) => {
        if (state.mode === Mode.EnterCommand) {
            const result = runCommand(state, state.command);
            if (result.output.status === 0) {
                return {
                    ...result,
                    command: ''
                };
            }
            else {
                return result;
            }
        }
    });
});
mappings.set(hasName('backspace'), (elem) => {
    elem.setState((state) => {
        return {
            command: state.command.slice(0, -1)
        };
    });
});
mappings.set(hasName('escape'), (elem) => {
    elem.setState((state) => {
        return {
            mode: Mode.Default,
            command: ''
        };
    });
});
mappings.set(hasName('q'), (elem) => {
    elem.setState((state) => {
        if (state.mode === Mode.Default) {
            process.exit(0);
        }
        else if (state.mode === Mode.ShowCommand) {
            return {
                mode: Mode.Default
            };
        }
        else {
            return {
                command: state.command + 'q'
            };
        }
    });
});
mappings.set(hasSequence('/'), (elem) => {
    elem.setState((state) => {
        if (state.mode === Mode.Default || state.mode === Mode.ShowCommand) {
            return {
                mode: Mode.EnterCommand
            };
        }
        else if (state.mode === Mode.EnterCommand) {
            return {
                command: state.command + '/'
            };
        }
    });
});
const loadFile = (content) => {
    const lines = content.split('\n');
    const buff = new CircularBuffer(lines.length);
    for (const line of lines) {
        buff.add(new Line(line));
    }
    return {
        cursor: {
            position: 0,
            cursor: 0
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
        displayLines: [],
        lineId: 0
    };
};
const help = `
This is dumb
This is dumb
This is dumb
This is dumb
This is dumb
This is dumb
This is dumb
This is dumb
This is dumb
This is dumb
This is dumb
`;
mappings.set(hasSequence('?'), (elem) => {
    // -- this does not seem correct, but replaceState is deprecated.
    const oldState = elem.state;
    const fileStore = oldState.fileStore;
    fileStore.set('stdin', oldState);
    const helpFile = loadFile(help);
    elem.setState(state => {
        console.clear();
        return {
            ...helpFile,
            screen: oldState.screen,
            ttyIn: oldState.ttyIn,
            fileStore: oldState.fileStore
        };
    });
});
export default mappings;
//# sourceMappingURL=commands.js.map