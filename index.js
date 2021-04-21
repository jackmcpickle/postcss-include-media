import { validBreakpoints } from './src/validBreakpoints';
import { getRuleDimension } from './src/getRuleDimension';
import { getUnitFromBreakpoint } from './src/getUnitFromBreakpoint';
import { captureBreakpoint } from './src/captureBreakpoint';
import { getRuleValue } from './src/getRuleValue';
import { captureOperator, getMinMax } from './src/captureMinMax';

const AT_RULE_NAME = 'include-media';

export default (opts = {}) => {
    const breakpoints = opts.breakpoints;
    if (!validBreakpoints(breakpoints)) {
        throw new Error('Breakpoints are not the valid structure, must be { key: String }');
    }

    return {
        postcssPlugin: 'postcss-include-media',

        Root(root, { result }) {
            root.walkAtRules(function (atRule) {
                if (atRule.name === AT_RULE_NAME) {
                    const newParams = atRule.params.split(',').map((params) => {
                        const operator = captureOperator(params);
                        const minMax = getMinMax(operator);
                        const dimension = getRuleDimension(params, operator);
                        const breakpoint = captureBreakpoint(params, operator, breakpoints);
                        if (!isNaN(parseFloat(breakpoint))) {
                            result.warn(`Not a valid breakpoint of "${breakpoint}" given to @include-media`);
                        }
                        const unitMeasure = getUnitFromBreakpoint(breakpoint);
                        const value = getRuleValue(breakpoint, operator);
                        return `(${minMax}-${dimension}: ${value}${unitMeasure})`;
                    });
                    console.log(newParams);
                    const newAtRule = atRule.clone();
                    newAtRule.params = newParams.join(' and ');
                    newAtRule.name = 'media';
                    atRule.replaceWith(newAtRule);
                }
            });
        },
    };
};
