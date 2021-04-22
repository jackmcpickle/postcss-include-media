import { validBreakpoints, validMediaExpressions, validUnitIntervals } from './src/validators';
import { getRuleDimension } from './src/getRuleDimension';
import { getUnitFromBreakpoint } from './src/getUnitFromBreakpoint';
import { captureBreakpoint } from './src/captureBreakpoint';
import { getRuleValue } from './src/getRuleValue';
import { captureOperator, getMinMax } from './src/captureMinMax';
import { defaultBreakpoints, defaultMediaExpressions, defaultUnitIntervals } from './src/constants';
import { captureMediaExpression } from './src/captionMediaExpression';
const AT_RULE_NAME = 'include-media';

export default (opts = {}) => {
    const breakpoints = opts.breakpoints || defaultBreakpoints;
    const mediaExpressions = opts.mediaExpressions || defaultMediaExpressions;
    const unitIntervals = opts.unitIntervals || defaultUnitIntervals;

    if (!validBreakpoints(breakpoints)) {
        throw new Error('Breakpoints are not the valid structure, must be { key: String }');
    }
    if (!validMediaExpressions(mediaExpressions)) {
        throw new Error('Media expressions are not the valid structure, must be { key: String }');
    }
    if (!validUnitIntervals(unitIntervals)) {
        throw new Error('Unit Intervals are not the valid structure, must be { key: Number }');
    }

    return {
        postcssPlugin: 'postcss-include-media',

        Root(root, { result }) {
            root.walkAtRules(function (atRule) {
                if (atRule.name === AT_RULE_NAME) {
                    const newParams = atRule.params.split(',').map((params) => {
                        const matchedMediaExpression = captureMediaExpression(params, mediaExpressions);
                        if (matchedMediaExpression) {
                            return `${matchedMediaExpression}`;
                        }
                        const operator = captureOperator(params);
                        const minMax = getMinMax(operator);
                        const dimension = getRuleDimension(params, operator);
                        const breakpoint = captureBreakpoint(params, operator, breakpoints);
                        if (isNaN(parseFloat(breakpoint))) {
                            result.warn(`Not a valid breakpoint of "${breakpoint}" given to @include-media`);
                        }
                        const unitMeasure = getUnitFromBreakpoint(breakpoint);
                        const value = getRuleValue(breakpoint, operator, unitIntervals);
                        return `(${minMax}-${dimension}: ${value}${unitMeasure})`;
                    });
                    const newAtRule = atRule.clone();
                    newAtRule.params = newParams.join(' and ');
                    newAtRule.name = 'media';
                    atRule.replaceWith(newAtRule);
                }
            });
        },
    };
};
