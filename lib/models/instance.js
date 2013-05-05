
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

/**
 * SSH into a server, execute command.
 *
 *    $ tower exec ec2:server <name> "node -v"
 */

exports.exec = function(recipe, args, fn){
  console.log('Not implemented');
  return;
  // [node, tower, verb, object, keyName, cmd]
  var name = args[4];
  var cmd = args[5];
  // XXX: get ip address from host.
  query('instance', 'find', [ '-n', name ], function(err, instances){
    // XXX: shouldn't return array if only 1?
    var instance = instances[0];
    var host = instance.host;
    var spawn = require('child_process').spawn;
    // XXX: warn if ssh-cookbook is not installed.
    var sshKeyPath = '~/.tower/config/credentials/ec2/' + name + '.pem';
    var args = [
        'enter', 'ssh'
      , '--key', sshKeyPath
      , '--exec', cmd
      , '--host', host
      , '--user', 'ubuntu'
    ];

    spawn('tower', args, { stdio: 'inherit' })
      .on('exit', function(){
        fn();
      });
  });
}