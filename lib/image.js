
/**
 * Module dependencies.
 */

var ec2 = require('tower-ec2-adapter')
  , connect = require('./connect')
  , command = require('./command');

/**
 * List images.
 */

exports.list = function(recipe, args, fn){
  // lazy-load
  var action = ec2.action('image.find');
  var query = ec2('image');
  
  var options = command()
    .query(query)
    .params(action.params)
    .attrs(action.attrs, 'find', args);

  connect(options, function(){
    var log = options.ui || console.log;

    query
      .exec(function(err, images){
        log(images);
        fn();
      });
  });
}

/**
 * Create an image.
 */

exports.create = function(recipe, args){
  var options = require('commander')
    .option('-d, --data <value>', json)
    .parse(args);

  console.log(options.data);
  console.log('Not implemented');

  function json(val) {
    if (val) return JSON.parse(val);
  }
}

/**
 * Remove (terminate) an image.
 */

exports.remove = function(recipe, args){
  console.log('Not implemented');
}