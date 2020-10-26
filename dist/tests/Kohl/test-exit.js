import { createApp } from '../utils.js';
import { KeyPress } from '@rgrannell/inkling';
import tap from 'tap';
/**
 * Check that the app displays "No Matches" by default, when no stdin frames are provided.
 */
const testExit = () => {
    let $kohl = createApp();
    tap.includes($kohl.lastFrame(), 'No Matches', 'mismatched empty stdin content');
    $kohl.press(new KeyPress('q'));
    throw new Error('kohl did not exit process upon hitting "q" at the top level; exit flow is broken');
};
testExit();
//# sourceMappingURL=test-exit.js.map