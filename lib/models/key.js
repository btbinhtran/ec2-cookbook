
/**
 * Module dependencies.
 */

var query = require('../query');

/**
 * List public/private keys.
 */

exports.list = function(recipe, args, fn){
  query('key', 'find', args, fn);
}

/**
 * Create a public/private key.
 */

exports.create = function(recipe, args){
  query('key', 'create', args, fn);
}

/**
 * Remove a public/private key.
 */

exports.remove = function(recipe, args){
  query('key', 'remove', args, fn);
}