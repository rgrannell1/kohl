import { Mode } from '../../commons/types.js';
import { hasName, hasSequence } from './utils.js';
import { runCommand } from '../run-command.js';
const mappings = new Map();
mappings.set(hasName('return'), (elem) => {
    elem.setState((state) => {
        if (state.mode === Mode.EnterCommand) {
            const result = runCommand(state, state.command);
            return {
                ...result.output.state,
                command: result.output.status === 0
                    ? ''
                    : state.command
            };
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
            process.kill(process.pid, 'SIGINT');
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
mappings.set(hasSequence('?'), (elem) => {
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
export default mappings;
//# sourceMappingURL=commands.js.map