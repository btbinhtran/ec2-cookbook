
/**
 * Expose `connect`.
 */

module.exports = connect;

/**
 * Wire up EC2 credentials.
 */

function connect(options, fn) {
  var ec2 = require('tower-ec2-adapter');

  if (!options.key && !options.secret) {
    // try to load from databag.
    var path = require('path');

    var data = require(path.join(process.env.HOME, '.tower/config/data.json'));
    //recipe.exec('ec2:credentials', 'show', [], function(data){
    //  console.log('here', data)
    //});
    ec2().connect(data['aws'], fn);
  } else {
    // XXX: make `connect` top-level
    ec2().connect({ key: options.key, secret: options.secret }, fn);
  }
}