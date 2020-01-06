const jwt = require('jsonwebtoken');

const issueToken = (user, expiresIn = '7d') =>
  jwt.sign({ id: user }, process.env.JWT_SECRET, { expiresIn });

module.exports = {
  issueToken
};
