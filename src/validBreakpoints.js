// TODO write validation to confirm structure of required breakpoints.
/* EG const breakpoints = {
  sm: '350px',
  md: '600px',
  lg: '1200px',
};
*/
export const validBreakpoints = (breakpoints) => Object.values(breakpoints).every((value) => typeof value === 'string');
