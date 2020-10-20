import { keypress } from './utils.js';
const mappings = new Map();
mappings.set(keypress('ctrl + c'), () => process.kill(process.pid, 'SIGINT'));
mappings.set(keypress('ctrl + z'), () => process.kill(process.pid, 'SIGSTP'));
export default mappings;
//# sourceMappingURL=signals.js.map