import { getUnitIntervals } from './getIntervalValue';
/**
 * Get value of an expression, based on a found operator
 *
 * @param {String} breakpoint - the found breakpoint value
 * @param {String} operator - Operator found in the `atRule.params`
 *
 * @return {Number} - A numeric value
 */
export const getRuleValue = (breakpoint, operator) => {
    const parsedValue = parseFloat(breakpoint);

    const unitInterval = getUnitIntervals(breakpoint);

    if (operator === '>') {
        return parsedValue + unitInterval;
    } else if (operator === '<') {
        return parsedValue - unitInterval;
    }

    return parsedValue;
};
