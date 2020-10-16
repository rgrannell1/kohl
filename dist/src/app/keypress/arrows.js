import { hasName } from './utils.js';
import LinesFilter from '../LinesFilter.js';
const mappings = new Map();
mappings.set(hasName('up'), (elem) => {
    elem.setState((state) => {
        const newFile = { ...state.file };
        newFile.cursor.position = Math.max(state.file.cursor.position - 1, 0);
        newFile.cursor.column = state.file.cursor.column;
        return {
            file: newFile
        };
    });
});
mappings.set(hasName('down'), (elem) => {
    elem.setState((state) => {
        const filter = new LinesFilter(state.file);
        const bottom = filter.selected() - state.screen.rows;
        const newFile = { ...state.file };
        newFile.cursor.position = Math.min(state.file.cursor.position + 1, bottom);
        newFile.cursor.column = state.file.cursor.column;
        return {
            file: newFile
        };
    });
});
mappings.set(hasName('right'), (elem) => {
    elem.setState((state) => {
        const newFile = { ...state.file };
        newFile.cursor.position = state.file.cursor.position;
        newFile.cursor.column = state.file.cursor.column + 2;
        return {
            file: newFile
        };
    });
});
mappings.set(hasName('left'), (elem) => {
    elem.setState((state) => {
        const newFile = { ...state.file };
        newFile.cursor.position = state.file.cursor.position;
        newFile.cursor.column = Math.max(state.file.cursor.column - 2, 0);
        return {
            file: newFile
        };
    });
});
mappings.set(hasName('pagedown'), (elem) => {
    elem.setState((state) => {
        const filter = new LinesFilter(state.file);
        const bottom = filter.selected() - state.screen.rows;
        const newFile = { ...state.file };
        newFile.cursor.position = Math.min(state.file.cursor.position + 10, bottom);
        return {
            file: newFile
        };
    });
});
mappings.set(hasName('pageup'), (elem) => {
    elem.setState((state) => {
        const newFile = { ...state.file };
        newFile.cursor.position = Math.max(state.file.cursor.position - 10, 0);
        return {
            file: newFile
        };
    });
});
export default mappings;
//# sourceMappingURL=arrows.js.map