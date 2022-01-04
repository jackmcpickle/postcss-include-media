import { BreakpointType, MediaExpressionType, UnitIntervalType } from '../index.d';
// TODO write validation to confirm structure of required breakpoints.
/**
 * Function to validate media expression shape
 *
 * @param {BreakpointType} breakpoints - object of breakpoints definitions
 * @example { sm: '350px', md: '600px', };
 *
 * @returns {boolean}
 */
export const validBreakpoints = (breakpoints: BreakpointType): boolean => Object.values(breakpoints).every((value) => typeof value === 'string');

/**
 * Function to validate media expression shape
 *
 * @param {MediaExpressionType} expressions - object of expressions definitions
 * @example { screen: 'screen', print: 'print' };
 *
 * @returns {boolean}
 */
export const validMediaExpressions = (expressions: MediaExpressionType): boolean => Object.values(expressions).every((value) => typeof value === 'string');

/**
 * Function to validate media expression shape
 *
 * @param {UnitIntervalType} unitIntervals - object of unitIntervals definitions
 * @example { px: 1, em: 0.01 };
 *
 * @returns {boolean}
 */
export const validUnitIntervals = (unitIntervals: UnitIntervalType): boolean => Object.values(unitIntervals).every((value) => Number(value) === value);

/**
 * Function to validate include-media rule name
 *
 * @param {UnitIntervalType} unitIntervals - object of unitIntervals definitions
 * @example 'includeMedia';
 *
 * @returns {boolean}
 */
export const validRuleName = (name: string): boolean => typeof name === 'string';
