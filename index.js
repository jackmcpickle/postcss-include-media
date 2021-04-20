const { validBreakpoints } = require('./src/validBreakpoints');
const { captureAction, actionMap } = require('./src/captureAction');
const { captureSize } = require('./src/captureSize');

module.exports = (opts = { }) => {

  const breakpoints = (opts.breakpoints);
  if (!validBreakpoints(breakpoints)) {
    throw new Error('Breakpoints are not the valid structure, must be { key: String }')
  }

  return {
    postcssPlugin: 'postcss-include-media',

    Root (root) {
      root.walkRules(function (rule) {
        if (rule.parent?.type === 'atrule' && rule.parent?.name === 'include-media') {
          const signAction = captureAction(rule.parent.params)
          const signSize = captureSize(rule.parent.params)
          const capturedBreakpoint = breakpoints[signSize];
          const size = actionMap(signAction);
          const newParams = `(${size} ${capturedBreakpoint})`;
          rule.parent.params = newParams;
          rule.parent.name = 'media';
        }
      })
    },

    /*
    Declaration (decl, postcss) {
      // The faster way to find Declaration node
    }
    */

    /*
    Declaration: {
      color: (decl, postcss) {
        // The fastest way find Declaration node if you know property name
      }
    }
    */
  }
}
module.exports.postcss = true
