const captureSize = (string) => {
  const reg = new RegExp('(?![<>=]+)(?![0-9]+)([a-z]+)');
  const actions = string.match(reg) || [''];
  return actions[0];
}


module.exports = {
  captureSize
}
