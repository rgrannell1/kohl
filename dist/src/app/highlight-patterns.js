import ansi from 'ansi-styles';
import { sequenceBy, isString, isRegexp, hashSignature } from '../commons/utils.js';
const matchStringPattern = (line, pattern) => {
    // -- return matches for string literals. Not implemented by default
    let id = 0;
    const results = [];
    for (let ith = 0; ith < line.length - pattern.length; ++ith) {
        const sliced = line.slice(ith, line.length);
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
    const id = 0;
    // -- match each pattern as many times as possible using `matchAll`
    for (const pattern of patterns) {
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
            const isInMatch = data.index >= match.start && data.index < match.end;
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
/**
 *
 *
 * @param parts
 */
export const formatString = (parts) => {
    let message = '';
    const grouped = sequenceBy(hasSameId, parts);
    for (const stretch of grouped) {
        const chars = stretch.map(group => group.char);
        const [{ id }] = stretch;
        message += formatText(chars.join(''), id);
    }
    return message;
};
let cache = new Map();
/**
 * Cache highlighted lines. Maps preserve insertion order so
 * removing head entries will remove the least-recently-used items. Given user's are normally
 * scrolling it makes sense to remove from the head.
 *
 * @param cache a cache of lines
 */
const clearCache = (cache) => {
    const maxSize = 1e3;
    if (cache.size <= maxSize) {
        return;
    }
    else {
        cache = new Map();
        let count = 0;
        for (let key of Object.entries(cache)) {
            cache.remove(key);
            count++;
            // -- arbitrary.
            if (count > maxSize / 2) {
                break;
            }
        }
    }
};
/**
 * highlight the visible string subsection. This is the computationally intensive part of the program
 * so it's memoised. This is measured as producting approximately an x10 performance gain for this function.
 *
 * @param text the line text
 * @param patterns the search and highlight patterns for the program
 * @param start the start index of the string subsection
 * @param end the end index of the string subsection
 *
 * @returns an ansi string
 */
export const highlightLineSegmentPatterns = (text, patterns, start, end) => {
    const signature = hashSignature([text, patterns, start, end]);
    const cacheEntry = cache.get(signature);
    clearCache(cache);
    if (typeof cacheEntry !== 'undefined') {
        return cacheEntry;
    }
    const result = formatString(highlightPatterns(text, patterns).slice(start, end));
    cache.set(signature, result);
    return result;
};
//# sourceMappingURL=highlight-patterns.js.map