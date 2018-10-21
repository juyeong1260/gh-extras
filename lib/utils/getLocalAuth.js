const {readFileSync} = require('fs');
const {AUTH_PATH} = require('../constants');

module.exports = () => JSON.parse(readFileSync(AUTH_PATH));
