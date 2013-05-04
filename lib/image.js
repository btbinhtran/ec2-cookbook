
/**
 * Module dependencies.
 */

var connect = require('./connect')
  , command = require('./command');

/**
 * List images.
 */

exports.list = function(recipe, args, fn){
  var ec2 = require('tower-ec2-adapter');
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

// https://github.com/joyent/node/issues/3211
// $ tower list ec2:images -i ami-7539b41c | tower create ec2:image
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

exports.remove = function(recipe, args){
  console.log('Not implemented');
}