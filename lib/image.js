
exports.list = function(recipe, args){
  console.log('Not implemented');

  var ec2 = require('tower-ec2-adapter');
  // XXX: should be possible directly from adapter.
  var action = require('tower-stream');
  var model = require('tower-model');
  model('ec2.image');
  var params = action('ec2.image.find').params;

  var options = require('commander');
  
  params.forEach(function(param){
    // options.option('')
    var alias = param.aliases && param.aliases[0];
    var name = [];
    var args = [name];
    if (alias) name.push('-' + alias);
    name.push('--' + param.name);
    switch (param.type) {
      case 'boolean':
        break;
      case 'array':
        name.push(' <value>');
        // XXX: can have the `parseArray` and other functions
        // just push into a `query`.
        args.push(param.description || param.name + ' parameter', parseArray);
      case 'string':
        name.push(' <value>');
        args.push(param.description || param.name + ' parameter');
      case 'integer':
        name.push(' <value>');
        args.push(param.description || param.name + ' parameter', parseInt);
        break;
    }

    args[0] = args[0].join(', ');
    options.option.apply(options, args);
  });

  options.parse(args);


}

exports.create = function(recipe, args){
  console.log('Not implemented');
}

exports.remove = function(recipe, args){
  console.log('Not implemented');
}

function parseArray(val) {
  return val.split(/,\s*/);
}