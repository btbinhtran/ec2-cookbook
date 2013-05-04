
/**
 * Module dependencies.
 */

var connect = require('./connect')
  , paramsToOptions = require('./params-to-options');

/**
 * List images.
 */

exports.list = function(recipe, args, fn){
  var ec2 = require('tower-ec2-adapter');
  // XXX: should be possible directly from adapter.
  var action = require('tower-stream');
  var model = require('tower-model');
  model('ec2.image');
  var params = action('ec2.image.find').params;
  //var options = paramsToOptions(params).parse(args);
  var options = require('commander');
  var attrs = action('ec2.image.find').attrs;
  var query = ec2('image');
  paramsToOptions.cli(params, attrs, options, query, args, 'find');

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