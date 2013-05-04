
exports.list = function(recipe, args, fn){
  parseArgs(recipe, args, function(options){
    var ec2 = require('tower-ec2-adapter');

    ec2().connect(options, function(){
      ec2('group')
        .where('name').eq('hello-again-again')
        .find(function(err, groups){
        console.log(groups);
        fn();
      });
    });
  });
}

exports.create = function(recipe, args, fn){
  parseArgs(recipe, args, function(options){
    var ec2 = require('tower-ec2-adapter');

    ec2().connect(options, function(){
      ec2('group').create(options, function(err, groups){
        console.log(groups)
        fn();
      });
    });
  });
}

/**
 * Update a security group.
 *
 * Example:
 *
 *    $ tower update ec2:group -n some-name -i tcp -p 22,80,8080
 */

exports.update = function(recipe, args, fn){
  parseArgs(recipe, args, function(options){
    var ec2 = require('tower-ec2-adapter');

    var data = {
      port: '22,80,8080'
    };

    // serializer('ec2.array.basic').to(val);
    ec2().connect(options, function(){
      ec2('group')
        .update(data, function(err, groups){
          console.log(groups)
          console.log('Not implemented');
          fn();
        });
    });
  });
}

exports.remove = function(recipe, args){
  console.log('Not implemented');
}

function parseArgs(recipe, args, fn) {
  var options = require('commander')
    .option('-k, --key [value]')
    .option('-s, --secret [value]')
    .option('-c, --credentials [value]', 'Path to credentials JSON')
    .option('-f, --format', 'The console output format')
    .option('-n, --name <value>')
    .option('-d, --description <value>')
    .parse(args);

  if (!options.key && !options.secret) {
    // try to load from databag.
    var fs = require('fs')
      , path = require('path');

    var data = require(path.join(process.env.HOME, '.tower/config/data.json'))['aws'];
    if (data && data.key && data.secret) {
      options.key = data.key
      options.secret = data.secret;
      fn(options);
    } else {
      console.log('No credentials found');
    }
  } else {
    fn(options);
  }
}