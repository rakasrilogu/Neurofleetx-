const bcrypt = require('bcryptjs');

const comparePassword = (plain, hash) => bcrypt.compare(plain, hash);

module.exports = { comparePassword };
