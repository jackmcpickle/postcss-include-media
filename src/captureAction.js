const captureAction = (string) => {
  const reg = new RegExp('([<>=]+)');
  const actions = string.match(reg) || [''];
  return actions[0];
}

const actionMap = (action) => {
  switch (action) {
    case '>':
    case '>=':
      return 'min-width:'
    case '<':
    case '<=':
      return 'max-width:'
    default:
      break;
  }
}


module.exports = {
  captureAction,
  actionMap
}
