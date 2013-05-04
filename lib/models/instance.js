
/**
 * Module dependencies.
 */

var query = require('../query');

/**
 * List instances.
 */

exports.list = function(recipe, args, fn){
  query('instance', 'find', args, fn);
}

/**
 * Create a new instance.
 *
 * Example:
 *
 *    $ tower create ec2:instance --role web-server
 */

exports.create = function(recipe, args, fn){
  query('instance', 'create', args, fn);
}

/**
 * Remove an instance.
 */

exports.remove = function(recipe, args, fn){
  query('instance', 'remove', args, fn);
}