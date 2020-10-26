import { createApp } from '../utils.js';
import { KeyPress } from 'inkling';
import tap from 'tap';
/**
 * Check that the app displays "No Matches" by default, when no stdin frames are provided.
 */
const testExit = () => {
    let $kohl = createApp();
    tap.includes($kohl.lastFrame(), 'No Matches', 'mismatched empty stdin content');
    $kohl.press(new KeyPress('q'));
    // -- TODO check exited upon q
};
testExit();
//# sourceMappingURL=test-exit.js.map