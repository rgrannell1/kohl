import { KohlInking } from '../utils.js';
import { KeyPress } from '@rgrannell/inkling';
import tap from 'tap';
/**
 * check that typing a command displays as expected.
 */
const testCommandDisplay = () => {
    let $kohl = new KohlInking();
    for (let char of '/testquery') {
        $kohl.press(new KeyPress(char));
    }
    tap.includes($kohl.lastFrame(), '> testquery', 'did not find "testquery" in body');
    $kohl.q();
    $kohl.escape();
    $kohl.q();
};
testCommandDisplay();
//# sourceMappingURL=test-command-display.js.map