import { OperatorsType, BreakpointType } from '../index.d';
/**
 * Used to return the matching breakpoint value. OR returns the value after the operator
 *
 * @param {string} atRuleParams the raw atRule.params
 * @param {string} operator the operator used to compare the trailing value
 * @param {object} breakpoints - object of breakpoints definitions
 *
 * @returns {string}
 */

export const captureBreakpoint = (atRuleParams: string, operator: OperatorsType, breakpoints: BreakpointType): string => {
    const operatorIndex = atRuleParams.indexOf(operator);
    const rawValue = atRuleParams.slice(operatorIndex + operator.length).replace(/['"()]/g, '');
    if (breakpoints[rawValue]) {
        return breakpoints[rawValue];
    }
    return rawValue;
};
