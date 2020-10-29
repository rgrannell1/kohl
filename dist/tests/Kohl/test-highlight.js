import { KohlInking } from '../utils.js';
import { KeyPress } from '@rgrannell/inkling';
import tap from 'tap';
import ansi from 'ansi-styles';
/**
 * Check that the app displays "No Matches" by default, when no stdin frames are provided.
 */
const testHighlight = async () => {
    let $kohl = new KohlInking();
    $kohl.toStdin([
        'testline0',
        'testline1',
        'testline2'
    ]);
    // -- load stdin.
    await $kohl.waitUntil((frame) => {
        return frame.includes('testline0') && frame.includes('testline1') && frame.includes('testline2');
    }, 3000);
    for (let char of '/show "testline1"') {
        $kohl.press(new KeyPress(char));
    }
    // -- check the show is input correctly
    await $kohl.waitUntil((frame) => frame.includes('> show "testline1"'), 3000);
    $kohl.press(new KeyPress('return'));
    // -- check header is now narrowed
    tap.includes($kohl.lastFrame(), 'kohl    line 0      3 / 3 (100%)');
    // -- check content is still visible
    tap.includes($kohl.lastFrame(), 'testline0');
    tap.includes($kohl.lastFrame(), 'testline1');
    tap.includes($kohl.lastFrame(), 'testline2');
    await new Promise(resolve => setTimeout(resolve, 2000));
    tap.includes($kohl.lastFrame(), `${ansi.green.open}testline1${ansi.green.close}`);
    // -- check that show? command shows the current show pattern
    for (let char of '/show?') {
        $kohl.press(new KeyPress(char));
    }
    $kohl.press(new KeyPress('return'));
    const lines = $kohl.lastFrame().split('\n');
    const last = lines[lines.length - 1];
    tap.include($kohl.lastFrame(), last);
    $kohl.escape();
    $kohl.q();
};
testHighlight();
//# sourceMappingURL=test-highlight.js.map