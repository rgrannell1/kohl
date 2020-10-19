import * as files from '../files.js';
import { Mode } from '../../commons/types.js';
import { hasName, hasSequence } from './utils.js';
import { runCommand } from '../run-command.js';
const mappings = new Map();
mappings.set(hasName('return'), (elem) => {
    elem.setState((state) => {
        if (state.mode === Mode.EnterCommand) {
            const result = runCommand(state, state.command);
            if (result.output.status === 0) {
                // -- register the command in history
                const history = state.fileStore.get('history');
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
mappings.set(hasSequence('?'), (elem) => {
    // -- this does not seem correct, but replaceState is deprecated.
    elem.setState((state) => {
        const fileStore = state.fileStore;
        fileStore.set(state.fileId, state);
        if (state.fileId === 'help') {
            // -- load the previously loaded file.
            return {
                ...fileStore.get('-')
            };
        }
        else {
            // -- store a reference to the current state
            fileStore.set('-', state);
            return {
                ...files.loadFile(files.help()),
                screen: state.screen,
                ttyIn: state.ttyIn,
                fileStore: state.fileStore,
                lineId: 0
            };
        }
    });
});
export default mappings;
//# sourceMappingURL=commands.js.map