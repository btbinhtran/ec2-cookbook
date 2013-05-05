
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

exports.create = function(recipe, args, fn){
  if ('--data' === args[args.length - 2])
    args[args.length - 2] = '--body';

  console.log(args)

  query('key', 'create', args, fn);
}

/**
 * Remove a public/private key.
 */

exports.remove = function(recipe, args, fn){
  query('key', 'remove', args, fn);
}