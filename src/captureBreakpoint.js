/**
 * Used to return the matching breakpoint value. OR returns the value after the operator
 *
 * @param {string} atRuleParams the raw atRule.params
 * @param {string} operator the operator used to compare the trailing value
 *
 * @returns {string}
 */

export const captureBreakpoint = (atRuleParams, operator, breakpoints) => {
    const operatorIndex = atRuleParams.indexOf(operator);
    const rawValue = atRuleParams.slice(operatorIndex + operator.length).replace(/['"()]/g, '');
    if (breakpoints[rawValue]) {
        return breakpoints[rawValue];
    }
    return rawValue;
};
