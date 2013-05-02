
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
  var options = paramsToOptions(params).parse(args);

  console.log(options)

  connect(options, function(){
    var log = options.ui || console.log;

    ec2('image')
      .where('architecture').eq('x86_64')
      .where('imageId').eq(options.imageId)
      .find(function(err, images){
        log(images);
        fn();
      });
  });
}

exports.create = function(recipe, args){
  console.log('Not implemented');
}

exports.remove = function(recipe, args){
  console.log('Not implemented');
}