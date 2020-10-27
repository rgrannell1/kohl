import { createApp } from '../utils.js';
import { KeyPress } from '@rgrannell/inkling';
/**
 * Check that the app displays "No Matches" by default, when no stdin frames are provided.
 */
const testScroll = async () => {
    let $kohl = createApp();
    for (let ith = 0; ith < 100; ++ith) {
        $kohl.stdin.write(`line${ith}\n`);
    }
    await $kohl.waitUntil(frame => frame.includes('line1'));
    await $kohl.waitUntil(frame => frame.includes('line 0'));
    $kohl.press(new KeyPress('down'));
    await $kohl.waitUntil((frame) => frame.includes('line 1'));
    $kohl.press(new KeyPress('down'));
    await $kohl.waitUntil((frame) => frame.includes('line 2'));
    $kohl.press(new KeyPress('down'));
    await $kohl.waitUntil((frame) => frame.includes('line 3'));
    $kohl.press(new KeyPress('q'));
    $kohl.press(new KeyPress('q'));
    throw new Error('kohl did not exit process upon hitting "q" at the top level; exit flow is broken');
};
testScroll();
//# sourceMappingURL=test-scroll.js.map