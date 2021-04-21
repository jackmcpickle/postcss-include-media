import { unitIntervals } from './constants';
import { getUnitFromBreakpoint } from './getUnitFromBreakpoint';
/**
 *
 * @param {string} breakpoint - the found breakpoint value
 * @returns {number}
 */
export const getUnitIntervals = (breakpoint) => {
    const unit = getUnitFromBreakpoint(breakpoint);
    return unitIntervals[unit];
};
