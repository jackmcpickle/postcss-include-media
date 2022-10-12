/**
 *  Get dimension of an atRule params, based on a found operator
 *
 *  @param {string} atRuleParams - Expression to extract dimension from
 *  @param {string} operator - Operator from `params`
 *
 *  @return {string} - `width` or `height` (or potentially anything else)
 */
export const getRuleDimension = (atRuleParams: string, operator: string): string => {
    const operatorIndex = atRuleParams.indexOf(operator);
    const parsedDimension = atRuleParams.slice(1, operatorIndex - 1);
    const dimension = 'width';

    if (parsedDimension.length > 0) {
        return parsedDimension;
    }

    return dimension;
};
