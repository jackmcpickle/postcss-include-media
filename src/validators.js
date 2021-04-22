// TODO write validation to confirm structure of required breakpoints.
/**
 * Function to validate media expression shape
 *
 * @param {object} breakpoints - object of breakpoints definitions
 * @example { sm: '350px', md: '600px', };
 *
 * @returns {boolean}
 */
export const validBreakpoints = (breakpoints) => Object.values(breakpoints).every((value) => typeof value === 'string');

/**
 * Function to validate media expression shape
 *
 * @param {object} expressions - object of expressions definitions
 * @example { screen: 'screen', print: 'print' };
 *
 * @returns {boolean}
 */
export const validMediaExpressions = (expressions) => Object.values(expressions).every((value) => typeof value === 'string');

/**
 * Function to validate media expression shape
 *
 * @param {object} unitIntervals - object of unitIntervals definitions
 * @example { px: 1, em: 0.01 };
 *
 * @returns {boolean}
 */
export const validUnitIntervals = (unitIntervals) => Object.values(unitIntervals).every((value) => Number(value) === value);
