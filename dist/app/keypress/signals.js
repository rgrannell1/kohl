import { keypress } from './utils.js';
const mappings = new Map();
mappings.set(keypress('ctrl + c'), (elem) => {
    process.kill(process.pid, 'SIGINT');
});
mappings.set(keypress('ctrl + z'), (elem) => {
    process.kill(process.pid, 'SIGSTP');
});
export default mappings;
