
/**
 * Expose `ec2`.
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
  , 'image'
  , 'group'
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
  return require.resolve('./lib/models/' + name);
}

/**
 * List commands for EC2 cookbooks.
 */

exports.help = function(recipe, args){
  var txt = [''];
  exports.objects.forEach(function(name){
    var cookbook = require(ec2(name));
    for (var verb in cookbook)
      txt.push(['    $', 'tower', verb, name].join(' '));
  });
  txt.push('');
  console.log(txt.join('\n'));
}