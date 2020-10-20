import { Mode, LanguageParts } from '../commons/types.js';
import P from 'parsimmon';
import { library } from '../library/index.js';
import { language } from './language.js';
const lang = P.createLanguage(language);
/**
 *
 * @param command
 */
const parseCommand = (command) => {
    return lang.Value.tryParse(command);
};
const executeCommand = (parsed, libs, state) => {
    if (parsed.type === LanguageParts.Call) {
        const { proc, args } = parsed;
        if (!libs[proc]) {
            return {
                message: `unknown procedure "${proc}".`,
                status: 1,
                state: {}
            };
        }
        try {
            const procDef = libs[proc];
            if (args.length !== procDef.parameters) {
                return {
                    message: `expected #${procDef.parameters} args, got #${args.length}`,
                    status: 1,
                    state: {}
                };
            }
            // -- invoke the command & set new desired state.
            return {
                status: 0,
                state: libs[proc](state, ...args)
            };
        }
        catch (err) {
            return {
                message: err.message,
                status: 1,
                state: {}
            };
        }
    }
    return {
        status: 1,
        state: {}
    };
};
export const runCommand = (state, command) => {
    try {
        var parsed = parseCommand(command);
    }
    catch (err) {
        return {
            // -- failed to parse
            mode: Mode.ShowCommand,
            command,
            output: {
                status: 1,
                message: 'parse failure; hit q'
            }
        };
    }
    try {
        // -- execute and return new state
        const { message, status, state: newState } = executeCommand(parsed, library, state);
        return {
            mode: Mode.ShowCommand,
            command,
            output: {
                message,
                status
            },
            // -- note: newState can set the above properties.
            ...newState
        };
    }
    catch (err) {
        // -- failed to execute.
        const message = err.message.slice(0, 10);
        return {
            mode: Mode.ShowCommand,
            command,
            output: {
                status: 1,
                message
            }
        };
    }
};
//# sourceMappingURL=run-command.js.map