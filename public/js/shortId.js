
const shortIds = function () {
  const alphaBet = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const inputLength = 5;
  let rtn = '';
  for (let i = 0; i < inputLength; i++) {
    rtn += alphaBet.charAt(Math.floor(Math.random() * alphaBet.length));
  }
  return rtn;
}

module.exports = shortIds;