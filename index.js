
/**
 * Expose `ec2` cookbook.
 */

exports = module.exports = ec2;

/**
 * Sub-cookbooks.
 *
 * XXX: Maybe they're called `commands`?
 */

exports.objects = [
    'instance'
  , 'credentials'
];

/**
 * Alternative names for commands.
 */

exports.aliases = {
    instances: 'instance'
  , server: 'instance'
  , images: 'image'
  , keys: 'key'
  , groups: 'group'
  , 'security-group': 'group'
}

/**
 * EC2 Cookbook.
 *
 * @param {String} name Name of the sub-cookbook.
 * @return {String} Return absolute path to sub-cookbook.
 */

function ec2(name){
  return require.resolve('./lib/' + name);
}

/**
 * List commands for EC2 cookbooks.
 */

exports.describe = function(recipe, args){
  exports.objects.forEach(function(name){
    var cookbook = require(ec2(name));
    for (var verb in cookbook)
      console.log('    $', 'tower', verb, name);
  });
}