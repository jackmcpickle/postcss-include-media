import { UnitIntervalType } from '../index.d';
import { getUnitFromBreakpoint } from './getUnitFromBreakpoint';
/**
 * Get value of an expression, based on a found operator
 *
 * @param {string} breakpoint - the found breakpoint value
 * @param {string} operator - Operator found in the `atRule.params`
 * @param {UnitIntervalType} unitIntervals - The unit intervals to calculate the steps if > or <
 *
 * @return {number} - A numeric value
 */
export const getRuleValue = (breakpoint: string, operator: string, unitIntervals: UnitIntervalType): number => {
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
