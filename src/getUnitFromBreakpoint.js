import { UNITS } from './constants';
/**
 * Used to caption the final units
 * @param {string} breakpoint - the found breakpoint value
 *
 * @returns {string}
 */
export const getUnitFromBreakpoint = (breakpoint) => {
    const reg = new RegExp('([A-z%]+)');
    const match = breakpoint.match(reg)[0];
    return UNITS.includes(match) ? match : '';
};
