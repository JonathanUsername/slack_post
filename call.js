var req = require('request-promise');
var secrets = require('./secrets.private.json');
var argv = require('yargs').usage('Usage: $0 <command> [options]').argv;

var PARAMS, CALL;

if (argv.h || argv.help){
  console.log('call as -c with -j params as string that is parsed into JSON or -p for path of same: node call.js -c channels.history -j {"channel": "C07191CTG", "count": 1000} or use --history and specify a channel')
  process.exit(code=0);
}

if (argv.history){
  api("channels.history", {
    channel: argv.history,
    count: 1000
  }).then(function(data){
    console.log(data)
  })
} else {
  if (argv.c){
    CALL = argv.c;
  } else {
    console.log("Need call! Give me some c");
    process.exit(code=0);
  }
  if (argv.j){
    PARAMS = JSON.parse(argv.j);
  } else {
    PARAMS = ""
  }
  api(argv.c, PARAMS).then(function(data){
    console.log(data)
  })
}



function api(method, args){
  var params = {}
  params.uri = 'https://slack.com/api/' + method + '?token=' + secrets.token;
  params.method = 'POST'
  params.form = args
  return req(params)
}



