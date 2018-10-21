const cmd = require('commander');
const setAuth = require('./lib/setAuth');
const getCommits = require('./lib/getCommits');

const {version, description} = require('./package');

cmd
  .description(description)
  .version(version);

cmd
  .command('auth')
  .description('set github username and password for request Authenticate')
  .action(setAuth);

cmd.command('summary commit')
  .description('upload <files> to private gist.')
  .option('-R --repo [value]', 'repository')
  .option('-O --owner [value]', 'owner. default is username')
  .option('-S --since [value]', 'Only commits after this date will be returned (ex. 2018-01-01)')
  .option('-U --until [value]', 'Only commits before this date will be returned (ex. 2018-12-31)')
  .option('-s --save', 'save to json file')
  .action(getCommits);

cmd.parse(process.argv);