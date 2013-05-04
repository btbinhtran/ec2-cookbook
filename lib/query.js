
/**
 * Module dependencies.
 */

var ec2 = require('tower-ec2-adapter')
  , connect = require('./connect')
  , command = require('./command');

/**
 * Expose `query`.
 */

module.exports = query;

/**
 * General query abstraction for cookbook.
 */

function query(model, action, args, fn) {
  // lazy-load
  var stream = ec2.action(model + '.' + action);
  var q = ec2(model);
  
  var options = command()
    .query(q)
    .params(stream.params)
    .attrs(stream.attrs, action, args);

  // need a better way
  if (args[args.length - 1].match(/^(?:-h|--help)$/)) {
    options.help();
  }

  connect(options, function(){
    q.exec(function(err, records){
      console.log(records);
      fn();
    });
  });
}