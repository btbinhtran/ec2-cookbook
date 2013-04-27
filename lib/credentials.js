
/**
 * Show credentials.
 *
 * Returns JSON of api key and secret (encrypted).
 */

exports.read = function(recipe, args, fn){
  var fs = require('fs')
    , path = require('path');

  var data = require(path.join(process.env.HOME, '.tower/config/data.json'));
  console.log(data['aws']);
  //recipe
  //  .data('ec2')
  //  .find(fn);
}

exports.show = exports.read;

/**
 * Adds API key/secret to data bag.
 */

exports.add = function(recipe, args){
  var options = require('commander')
    .option('-k, --key <value>')
    .option('-s, --secret <value>')
    .parse(args);

  var fs = require('fs')
    , path = require('path')
    , dataPath = path.join(process.env.HOME, '.tower/config/data.json');

  var data = require(dataPath);
  data['aws'] = { key: options.key, secret: options.secret };
  fs.writeFileSync(dataPath, JSON.stringify(data, null, 2));
  //recipe
  //  // save data to global data bag.
  //  .data({ ec2: { key: options.key, secret: options.secret }})
  //  .save();
}

exports.save = exports.write = exports.add;

/**
 * Remove API key/secret from data bag.
 */

exports.remove = function(recipe, args){
  
}