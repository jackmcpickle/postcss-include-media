import { getUnitFromBreakpoint } from './getUnitFromBreakpoint';
/**
 * Get value of an expression, based on a found operator
 *
 * @param {String} breakpoint - the found breakpoint value
 * @param {String} operator - Operator found in the `atRule.params`
 * @param {Object} unitIntervals - The unit intervals to calculate the steps if > or <
 *
 * @return {Number} - A numeric value
 */
export const getRuleValue = (breakpoint, operator, unitIntervals) => {
    const parsedValue = parseFloat(breakpoint);

    const unit = getUnitFromBreakpoint(breakpoint);
    const unitInterval = unitIntervals[unit];

    if (operator === '>') {
        return parsedValue + unitInterval;
    } else if (operator === '<') {
        return parsedValue - unitInterval;
    }

    return parsedValue;
};
