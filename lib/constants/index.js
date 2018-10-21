const {homedir} = require('os');
const {join} = require('path');

const AUTH_DIR_PATH = join(homedir(), '.gh-extras');
const AUTH_PATH = join(AUTH_DIR_PATH, 'auth');

module.exports = {
  AUTH_DIR_PATH,
  AUTH_PATH
};