
// TODO write validation to confirm struction of required breakpoints.
/* EG const breakpoints = {
  sm: '350px',
  md: '600px',
  lg: '1200px',
};
*/
const validBreakpoints = (breakpoints) => Object.values(breakpoints).every(value => typeof(value) === 'string');


module.exports = {
  validBreakpoints
}
