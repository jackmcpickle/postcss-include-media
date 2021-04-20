const { validBreakpoints } = require('./src/validBreakpoints');
const { captureAction, actionMap } = require('./src/captureAction');
const { captureSize } = require('./src/captureSize');

const AT_RULE_NAME = 'include-media';

module.exports = (opts = { }) => {

  const breakpoints = (opts.breakpoints);
  if (!validBreakpoints(breakpoints)) {
    throw new Error('Breakpoints are not the valid structure, must be { key: String }')
  }

  return {
    postcssPlugin: 'postcss-include-media',

    Root (root) {
      root.walkAtRules(function (atRule) {
        if (atRule.name === AT_RULE_NAME) {
          const signAction = captureAction(atRule.params)
          const signSize = captureSize(atRule.params)
          const capturedBreakpoint = breakpoints[signSize];
          const size = actionMap(signAction);
          const newParams = `(${size} ${capturedBreakpoint})`;
          const newAtRule = atRule.clone();
          newAtRule.params = newParams;
          newAtRule.name = 'media';
          atRule.replaceWith(newAtRule);
        }
      })
    },
  }
}
module.exports.postcss = true
