
/**
 * Module dependencies.
 */

var query = require('./query');

/**
 * List images.
 */

exports.list = function(recipe, args, fn){
  query('image', 'find', args, fn);
}

/**
 * Create an image.
 */

exports.create = function(recipe, args, fn){
  query('image', 'find', args, fn);
}

/**
 * Remove (terminate) an image.
 */

exports.remove = function(recipe, args, fn){
  console.log('Not implemented');
  query('image', 'find', args, fn);
}