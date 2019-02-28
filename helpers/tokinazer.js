const jwt = require('jsonwebtoken');
const {secret, RefreshSecret} = require('../config/secrets');

module.exports = (id, email, credentials) => {
  const accessToken = jwt.sign({id, credentials}, secret, {expiresIn: 259200});
  const refreshToken = jwt.sign({id, email, credentials}, RefreshSecret, {expiresIn: 864000});
  const tokens = {
      accessToken,
      refreshToken
  };

  if(!tokens) throw new Error('Tokens was no created');
  return tokens;
};
