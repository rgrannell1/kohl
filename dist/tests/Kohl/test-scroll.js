import { KohlInking } from '../utils.js';
import { KeyPress } from '@rgrannell/inkling';
/**
 * Check that the app displays "No Matches" by default, when no stdin frames are provided.
 */
const testScroll = async () => {
    let $kohl = new KohlInking();
    for (let ith = 0; ith < 100; ++ith) {
        $kohl.toStdin([`test${ith}`]);
    }
    await $kohl.waitUntil(frame => frame.includes('test1'));
    await $kohl.waitUntil(frame => frame.includes('line 0'));
    // -- scroll down
    $kohl.press(new KeyPress('down'));
    await $kohl.waitUntil(frame => frame.includes('line 1') && !(/^test0$/).test(frame));
    $kohl.press(new KeyPress('down'));
    await $kohl.waitUntil(frame => frame.includes('line 2') && !(/^test1$/).test(frame));
    $kohl.press(new KeyPress('down'));
    await $kohl.waitUntil(frame => frame.includes('line 3') && !(/^test2$/).test(frame));
    // -- scroll up
    $kohl.press(new KeyPress('up'));
    await $kohl.waitUntil(frame => frame.includes('line 2') && !(/^test1$/).test(frame));
    $kohl.press(new KeyPress('up'));
    await $kohl.waitUntil(frame => frame.includes('line 1') && !(/^test0$/).test(frame));
    $kohl.q();
    $kohl.q();
    throw new Error('kohl did not exit process upon hitting "q" at the top level; exit flow is broken');
};
testScroll();
//# sourceMappingURL=test-scroll.js.map