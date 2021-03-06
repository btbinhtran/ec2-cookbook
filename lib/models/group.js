
/**
 * Module dependencies.
 */

var query = require('../query');

/**
 * List security groups.
 */

exports.list = function(recipe, args, fn){
  query('group', 'find', args, fn);
}

/**
 * Create a security group.
 */

exports.create = function(recipe, args, fn){
  query('group', 'create', args, fn);
}

/**
 * Update a security group.
 *
 * Example:
 *
 *    $ tower update ec2:group -n hello -p 22,80,8080 -i tcp,tcp,tcp
 */

exports.update = function(recipe, args, fn){
  query('group', 'update', args, fn);
}

/**
 * Remove a security group.
 */

exports.remove = function(recipe, args, fn){
  query('group', 'remove', args, fn);
}