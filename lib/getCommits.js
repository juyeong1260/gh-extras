const auth = require('./auth');
const getLocalAuth = require('./utils/getLocalAuth');
const mm = require('moment');
const {writeFile} = require('fs');
const {chain} = require('lodash');

const {username} = getLocalAuth();

const formatMoment = date => mm(date).format('YYYY-MM-DD');

module.exports = async (_, {
  repo,
  owner = username,
  since,
  until = formatMoment(),
  save = false
}) => {
  if (!repo) {
    console.error('gh-extras summary commit -R <respository>');
    process.exit(1);
  }
  const github = await auth();
  const params = since ? {
    since: formatMoment(since)
  } : {};
  let resData = [];
  let page = 1;
  let loopAble = true;
  while (loopAble) {
    const {data} = await github.repos.getCommits({
      ...params,
      owner, repo, until, page, per_page: 100
    });
    resData = [...resData, ...data];
    if (data.length < 100) {
      break;
    }
    page++;
  }
  console.log(`  total commits: ${resData.length}\n`);
  const count = chain(resData)
    .map(({commit: {author: {name}}}) => name)
    .groupBy(user => user)
    .toPairs()
    .orderBy(([_, value]) => value.length, 'desc')
    .map(([key, value]) => {
      console.log(`  ${key}: ${value.length}`);
      return {[key]: value.length};
    })
    .value();

  if (save) {
    writeFile('commits.json', JSON.stringify({
      detail: resData,
      count
    }, null, 2), err => {
      if (err) {
        console.error(err);
      }
      console.log('\n  created commits.json');
    });
  }
};