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
/**
 * Command return results.
 */
class Result {
    /**
     * A successful command-run
     *
     * @param state partial kohl state; the updates we want to apply to the pager's state
     */
    static Ok(state) {
        return {
            status: 0,
            state
        };
    }
    /**
     * An unsuccessful command execution
     *
     * @param message an error-message
     */
    static Error(message) {
        return {
            message,
            status: 1,
            state: {}
        };
    }
}
const executeCommand = (parsed, libs, state) => {
    if (parsed.type === LanguageParts.Call) {
        const { proc, args } = parsed;
        if (!libs[proc]) {
            return Result.Error(`unknown procedure "${proc}".`);
        }
        try {
            const procDef = libs[proc];
            if (args.length !== procDef.parameters) {
                return Result.Error(`expected #${procDef.parameters} args, got #${args.length}`);
            }
            return Result.Ok(libs[proc](state, ...args));
        }
        catch (err) {
            return Result.Error(err.message);
        }
    }
    return Result.Error('invalid parsed value');
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