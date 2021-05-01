/**
 * Used to return the matching breakpoint value. OR returns the value after the operator
 *
 * @param {string} atRuleParams the raw atRule.params
 * @param {object} mediaExpressions - object of mediaExpressions definitions
 *
 * @returns {string}
 */

export const captureMediaExpression = (atRuleParams, mediaExpressions) => {
    const cleanedParams = atRuleParams.replace(/['"()]/g, '');
    if (mediaExpressions[cleanedParams]) {
        return mediaExpressions[cleanedParams];
    }
    return false;
};
