#!/usr/local/bin/node

var req = require('request-promise');
var secrets = require('./secrets.private.json');
var argv = require('yargs').usage('Usage: $0 <command> [options]').argv;

var TEXT, IMAGE, NAME, CHANNEL, USER;

if (argv.h || argv.help){
  console.log('-t is text, -c is channel, -i is image, -n is username, -u is as_user. Or --call for a simple method that is not postmessage without params.')
  process.exit(code=0);
}

if (argv.t){
  TEXT = argv.t;
} else {
  console.log("Need text! Give me some t");
}

if (argv.c){
  CHANNEL = argv.c;
} else {
  CHANNEL = ""
  //CHANNEL = "C07191CTG" // General chat
}

if (argv.image || argv.i){
  IMAGE = argv.image || argv.i;
} else {
  IMAGE = 'http://www.clipartlord.com/wp-content/uploads/2012/12/robot-head.png'
}

if (argv.n || argv.name){
  NAME = argv.n || argv.name;
} else {
  NAME = 'A Robot';
}

if (argv.u || argv.user){
  USER = true;
} else {
  USER = false;
}

function api(method, args){
  var params = {}
  params.uri = 'https://slack.com/api/' + method + '?token=' + secrets.token;
  params.method = 'POST'
  params.form = args
  console.log(params)
  return req(params)
}

var serialiseObject = function(obj) {
    var pairs = [];
    for (var prop in obj) {
        if (!obj.hasOwnProperty(prop)) {
            continue;
        }
        pairs.push(prop + '=' + obj[prop]);
    }
    return pairs.join('&');
}

if (argv.call){
  console.log("Not posting. Calling: " + argv.call)
  if (argv.call){
    api(argv.call, {
      'token' : secrets.token
    }).then(console.dir)
  }
} else {
  api('chat.postMessage', {
    'token' : secrets.token,
    'channel': CHANNEL,
    'text': TEXT,
    'username': NAME,
    'as_user': USER,
    'icon_url': IMAGE
  }).then(console.dir).catch(console.dir)
}
