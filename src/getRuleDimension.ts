/**
 *  Get dimension of an atRule params, based on a found operator
 *
 *  @param {String} atRuleParams - Expression to extract dimension from
 *  @param {String} operator - Operator from `params`
 *
 *  @return {String} - `width` or `height` (or potentially anything else)
 */
export const getRuleDimension = (params, operator) => {
    const operatorIndex = params.indexOf(operator);
    const parsedDimension = params.slice(1, operatorIndex - 1);
    const dimension = 'width';

    if (parsedDimension.length > 0) {
        return parsedDimension;
    }

    return dimension;
};
