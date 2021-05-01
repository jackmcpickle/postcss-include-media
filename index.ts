import { IncludeMediaOptions } from './';
import { validBreakpoints, validMediaExpressions, validUnitIntervals } from './src/validators';
import { getRuleDimension } from './src/getRuleDimension';
import { getUnitFromBreakpoint } from './src/getUnitFromBreakpoint';
import { captureBreakpoint } from './src/captureBreakpoint';
import { getRuleValue } from './src/getRuleValue';
import { captureOperator, getMinMax } from './src/captureMinMax';
import { defaultBreakpoints, defaultMediaExpressions, defaultUnitIntervals } from './src/constants';
import { captureMediaExpression } from './src/captionMediaExpression';
import { Root, Result, AtRule } from 'postcss';

const AT_RULE_NAME = 'include-media';

const includeMediaPlugin = (opts: IncludeMediaOptions = {}) => {
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

        Root(root: Root, { result }: Record<any, Result>): void {
            root.walkAtRules(function (atRule: AtRule) {
                if (atRule.name === AT_RULE_NAME) {
                    const newParams = `${atRule.params}`.split(',').map((params) => {
                        const matchedMediaExpression = captureMediaExpression(params, mediaExpressions);
                        if (matchedMediaExpression) {
                            return `${matchedMediaExpression}`;
                        }
                        const operator = captureOperator(params);
                        const minMax = getMinMax(operator);
                        if (minMax === '') {
                            result.warn(`You have not defined an operator "${operator}" for @include-media`);
                            return `${params}`;
                        }
                        const dimension = getRuleDimension(params, operator);
                        const breakpoint = captureBreakpoint(params, operator, breakpoints);
                        if (isNaN(parseFloat(breakpoint))) {
                            result.warn(`Not a valid breakpoint of "${breakpoint}" given to @include-media`);
                            return `(${minMax}-${dimension}: ${breakpoint})`;
                        }
                        const unitMeasure = getUnitFromBreakpoint(breakpoint);
                        const value = getRuleValue(breakpoint, operator, unitIntervals);
                        return `(${minMax}-${dimension}: ${value}${unitMeasure})`;
                    });
                    const newAtRule = atRule.clone();
                    newAtRule.params = newParams.join(' and '); // TODO make configurable
                    newAtRule.name = 'media';
                    newAtRule.raws.afterName = ' '; // adds space between rule and query.
                    atRule.replaceWith(newAtRule);
                }
            });
        },
    };
};

includeMediaPlugin.postcss = true;

export default includeMediaPlugin;
