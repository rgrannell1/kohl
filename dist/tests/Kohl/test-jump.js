import { createApp } from '../utils.js';
import { KeyPress } from '@rgrannell/inkling';
import tap from 'tap';
/**
 * Check that the app displays "No Matches" by default, when no stdin frames are provided.
 */
const testJump = async () => {
    let $kohl = createApp();
    $kohl.press(new KeyPress('?'));
    tap.includes($kohl.lastFrame(), 'kohl    line 0      0 / 0 (100%)\n');
    for (let char of '/jump 3') {
        $kohl.press(new KeyPress(char));
    }
    $kohl.press(new KeyPress('return'));
    await $kohl.waitUntil((frame) => frame.includes('line 3'));
    $kohl.press(new KeyPress('q'));
    $kohl.press(new KeyPress('q'));
    throw new Error('kohl did not exit process upon hitting "q" at the top level; exit flow is broken');
};
testJump();
//# sourceMappingURL=test-jump.js.map