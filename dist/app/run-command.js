import { Mode, LanguageParts } from '../commons/types.js';
import P from 'parsimmon';
import { library } from './library.js';
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
        const parsed = parseCommand(command);
        const output = executeCommand(parsed, library, state);
        return {
            mode: Mode.ShowCommand,
            command,
            output
        };
    }
    catch (err) {
        return {
            mode: Mode.ShowCommand,
            command,
            output: {
                status: 1,
                message: err.message.slice(0, 10),
                state: null
            }
        };
    }
};
//# sourceMappingURL=run-command.js.map