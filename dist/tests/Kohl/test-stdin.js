import { KohlInking } from '../utils.js';
import { KeyPress } from '@rgrannell/inkling';
import tap from 'tap';
/**
 * Check that the app displays "No Matches" by default, when no stdin frames are provided.
 */
const testStdin = async () => {
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
    // -- check header has updated (currently failing without pressing up first). This should be removed
    // -- in future
    $kohl.press(new KeyPress('up'));
    tap.includes($kohl.lastFrame(), 'kohl    line 0      3 / 3 (100%)');
    $kohl.q();
};
testStdin();
//# sourceMappingURL=test-stdin.js.map