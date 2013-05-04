
/**
 * Module dependencies.
 */

var connect = require('./connect');

/**
 * List instances.
 */

exports.list = function(recipe, argv, fn){
  var options = require('commander')
    .option('-k, --key [value]')
    .option('-s, --secret [value]')
    .option('-c, --credentials [value]', 'Path to credentials JSON')
    .option('-f, --format', 'The console output format')
    .parse(argv);

  connect(options, function(){
    var ec2 = require('tower-ec2-adapter')
      , log = options.ui || console.log;

    ec2('instance').find(function(err, instances){
      // XXX: a table printer?
      log(instances);
      fn();
    });
  });
}

/**
 * Create a new instance.
 *
 * Example:
 *
 *    $ tower create ec2:instance --role web-server
 */

exports.create = function(recipe, argv, fn){
  var options = require('commander')
    .option('-i, --image <value>')
    .option('-r, --role [value]')
    .option('-n, --name <value>')
    .parse(argv);

  // XXX: how to force require automatically? (command-line validation)
  if (!options.image) throw new Error('Must specify --image');

  connect(options, function(){
    var ec2 = require('tower-ec2-adapter')
      , log = options.ui || console.log;

    var attributes = {
        imageId: options.image
      , key: options.name
    };

    ec2('instance').create([attributes], function(err, instances){
      // XXX: a table printer?
      log(instances);
      fn();
    });
  });
}

/**
 * Remove an instance.
 */

exports.remove = function(recipe, argv){
  
}