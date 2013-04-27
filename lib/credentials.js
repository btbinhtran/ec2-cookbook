
/**
 * Show credentials.
 *
 * Returns JSON of api key and secret (encrypted).
 */

exports.show = function(recipe, args, fn){
  recipe
    .data('ec2')
    .find(fn);
}

/**
 * Adds API key/secret to data bag.
 */

exports.add = function(recipe, args){
  var options = require('commander')
    .option('-k, --key <value>')
    .option('-s, --secret <value>');

  recipe
    // save data to global data bag.
    .data({ ec2: { key: options.key, secret: options.secret }})
    .save();
}

/**
 * Remove API key/secret from data bag.
 */

exports.remove = function(recipe, args){

}