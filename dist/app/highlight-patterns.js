import ansi from 'ansi-styles';
import { isString, isRegexp } from '../commons/checks.js';
import { sequenceBy } from '../commons/utils.js';
const matchStringPattern = (line, pattern) => {
    // -- return matches for string literals. Not implemented by default
    let id = 0;
    const results = [];
    for (let ith = 0; ith < line.length - pattern.length; ++ith) {
        let sliced = line.slice(ith, line.length);
        if (sliced.startsWith(pattern)) {
            results.push({
                start: ith,
                end: ith + pattern.length,
                id
            });
            ith += pattern.length;
            id++;
        }
    }
    return results;
};
const matchPattern = (line, pattern) => {
    const lineType = Object.prototype.toString.call(pattern).slice(8, -1).toLowerCase();
    if (isString(pattern)) {
        return matchStringPattern(line, pattern);
    }
    else if (isRegexp(pattern)) {
        const results = [...line.matchAll(pattern)].map((match, ith) => {
            if (typeof match.index === 'undefined') {
                throw new TypeError('index was not defined.');
            }
            return {
                start: match.index,
                end: match.index + match[0].length,
                id: ith
            };
        });
        return results;
    }
    else {
        throw new TypeError('invalid type provided.');
    }
};
export const highlightPatterns = (line, patterns) => {
    const allMatches = [];
    let id = 0;
    // -- match each pattern as many times as possible using `matchAll`
    for (const pattern of patterns.filter(pattern => pattern.length > 0)) {
        // -- note: does not work with strings;
        allMatches.push(...matchPattern(line, pattern));
    }
    // -- convert to characters and indices.
    const sequence = line.split('').map((char, index) => {
        return { char, index };
    });
    // -- tag each character by match, preferring later matches.
    for (const match of allMatches) {
        for (const data of sequence) {
            let isInMatch = data.index >= match.start && data.index < match.end;
            if (isInMatch) {
                data.id = match.id;
            }
        }
    }
    return sequence;
};
const displayColours = [
    'green',
    'red',
    'yellow',
    'blue',
    'magenta',
    'cyan',
    'black',
    'white',
    'gray',
    'grey'
];
const displayText = displayColours.map((colour) => {
    return (text) => {
        return `${ansi[colour].open}${text}${ansi[colour].close}`;
    };
});
const formatText = (chars, id) => {
    if (typeof id !== 'undefined' && Number.isInteger(id)) {
        const colourId = id % displayText.length;
        return displayText[colourId](chars);
    }
    else {
        return chars;
    }
};
const hasSameId = (elem0, elem1) => {
    return elem0.id === elem1.id;
};
const store = new WeakMap();
const memoise = (fn) => {
    return (parts) => {
        if (store.has(parts)) {
            return store.get(parts);
        }
        else {
            const result = fn(parts);
            store.set(parts, result);
            return result;
        }
    };
};
const _formatString = (parts) => {
    let message = '';
    const grouped = sequenceBy(hasSameId, parts);
    for (const stretch of grouped) {
        const chars = stretch.map(group => group.char);
        const [{ id }] = stretch;
        message += formatText(chars.join(''), id);
    }
    return message;
};
export const formatString = memoise(_formatString);
//# sourceMappingURL=highlight-patterns.js.map