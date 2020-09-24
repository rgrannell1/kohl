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
                status: 1
            };
        }
        const result = libs[proc](state, ...args);
        try {
            return result;
        }
        catch (err) {
            return {
                status: 1
            };
        }
    }
    return {
        status: 1
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