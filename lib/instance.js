
/**
 * Find instances
 */

exports.find = function(recipe, argv, fn){
  var options = require('commander')
    .on('--ui', 'The console output format')
    .on('--query')
    .parse(argv);

  var graph = require('tower-graph');
  graph.use('tower-ec2-adapter');

  var log = options.ui || console.log;

  graph.select('instances').find(function(err, instances){
    // XXX: a table printer?
    log(instances);
    fn();
  });
}

/**
 * Create new `instance`.
 */

exports.create = function(recipe, argv){
  var options = require('commander')
    .on('-i, --image [value]')
    .parse(argv);

  var ec2 = require('tower-ec2-adapter');

  var log = options.ui || console.log;

  var attributes = {
    imageId: options.image
  };

  ec2('instances').create(attributes, function(err, instance){
    // XXX: a table printer?
    log(instance);
    fn();
  });
}

/**
 * Remove an `instance`.
 */

exports.remove = function(recipe, argv){
  
}