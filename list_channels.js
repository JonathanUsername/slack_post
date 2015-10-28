var req = require('request-promise');
var secrets = require('./secrets.private.json');
var argv = require('yargs').usage('Usage: $0 <command> [options]').argv;

function api(method){
  params = {}
  params.uri = 'https://slack.com/api/' + method + '?token=' + secrets.token;
  return req(params)
}

api("channels.list").then(function(data){
  if (argv.getid){
    var ch = JSON.parse(data).channels
    for (var i in ch){
      if (ch[i].name == argv.getid){
        console.log(ch[i].id)
      }
    }
  } else {
    console.log(JSON.stringify(JSON.parse(data), null, 2))
  }
})

