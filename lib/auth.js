const Github = require('@octokit/rest');
const {existsSync} = require('fs');
const setAuth = require('./setAuth');
const getLocalAuth = require('./utils/getLocalAuth');
const {AUTH_PATH} = require('./constants');


module.exports = async () => {
  let auth;
  if(existsSync(AUTH_PATH)) {
    auth = getLocalAuth();
  } else {
    const newAuth = await setAuth();
    console.log(newAuth);
    auth = newAuth;
  }
  const {username, password} = auth;
  const encodeAuth = Buffer
    .from(`${username}:${password}`)
    .toString('base64');
  return new Github({
    headers: {
      accept: 'application/vnd.github.squirrel-girl-preview',
      Authorization: `Basic ${encodeAuth}`
    }
  });
};