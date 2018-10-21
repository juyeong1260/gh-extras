const {existsSync, writeFile, mkdir} = require('fs');
const Inquirer = require('inquirer');
const {AUTH_DIR_PATH, AUTH_PATH} = require('./constants');

const writeConfigFile = user => {
  writeFile(
    AUTH_PATH,
    JSON.stringify(user, null, 2),
    err => {
      if(err) {
        console.error(err);
        process.exit(1);
      }
    }
  );
};


module.exports = () => {
  return Inquirer.prompt([
    {type: 'input', name: 'username', message: 'Set your github username'},
    {type: 'input', name: 'password', message: 'Set your github password'}
  ])
  .then(userInfo => {
    if(existsSync(AUTH_DIR_PATH)) {
      writeConfigFile(userInfo);
    } else {
      mkdir(AUTH_DIR_PATH, err => {
        if(err) {
          console.error(err);
          process.exit(1);
        }
        writeConfigFile(userInfo);
      });
    }
    return userInfo;
  });
};