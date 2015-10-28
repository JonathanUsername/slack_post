#!/usr/local/bin/node

var req = require('request-promise');
var secrets = require('./secrets.private.json');
var argv = require('yargs').argv;

if (argv.h || argv.help){
  console.log('\nA simple CLI for posting to Slack.\n\t -t = text of post\n\t -c = channel or user to post to\n\t -i = URL of image for poster\n\t -n = username of poster\n\t -u = boolean flag to post as yourself\n\t --call = call simple method without params that is not postmessage\n')
  console.log('Examples:\n\tnode post.js -n PressUpBot -t "Bring Sally up, bring sally down... Time to do 10 press ups!" -i http://angrytrainerfitness.com/wp-content/uploads/2012/03/pushupmilitary.jpg -c @paulgwyther\n\tnode post.js --call channels.list\n')
  process.exit(0);
}

function api(method, args){
  var params = {}
  params.uri = 'https://slack.com/api/' + method + '?token=' + secrets.token;
  params.method = 'POST'
  params.form = args
  return req(params)
}

if (argv.call){
  if (argv.call){
    api(argv.call, {
      'token' : secrets.token
    }).then(console.dir)
  }
} else {
  api('chat.postMessage', {
    'token' : secrets.token,
    'channel': argv.c || "",
    'text': argv.t || "",
    'username': argv.n || "Slackbot",
    'as_user': argv.u || false,
    'icon_url': argv.i || ""
  }).then(console.dir).catch(console.dir)
}
