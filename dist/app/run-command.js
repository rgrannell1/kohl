import { Mode } from '../commons/types.js';
import P from 'parsimmon';
import { library } from './library.js';
var LanguageParts;
(function (LanguageParts) {
    LanguageParts[LanguageParts["Call"] = 0] = "Call";
    LanguageParts[LanguageParts["Jump"] = 1] = "Jump";
})(LanguageParts || (LanguageParts = {}));
const language = {};
language._ = () => {
    return P.regexp(/\s*/);
},
    language.__ = () => {
        return P.regexp(/\s+/);
    },
    language.Arg = ref => {
        return P.alt(ref.String, ref.Number);
    };
language.Call = ref => {
    return P.seqMap(ref.ProcName, ref.__, P.sepBy(ref.Arg, P.whitespace), (proc, _, args) => {
        return { type: LanguageParts.Call, proc, args };
    });
};
language.ProcName = () => {
    return P.regexp(/[a-zA-Z0-9]+/);
};
language.Number = () => {
    return P.regexp(/[0-9]+/).map(Number);
};
language.String = () => {
    return P.regexp(/\"[^\"]*\"/);
};
language.Jump = ref => {
    return P.regexp(/\:[0-9]+/).map(match => {
        return {
            proc: 'jump',
            type: LanguageParts.Call,
            args: [Number(match.slice(1))]
        };
    });
};
language.Value = ref => {
    return P.seqMap(ref._, P.alt(ref.Call, ref.Jump), ref._, (_0, core, _1) => core);
};
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
