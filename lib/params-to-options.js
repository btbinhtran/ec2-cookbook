
module.exports = paramsToOptions;

function paramsToOptions(params) {
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
        //name.push(param.description || param.name + ' parameter', parseArray);
        args.push('', parseArray);
      case 'string':
        name.push(' <value>');
      case 'integer':
        name.push(' <value>');
        break;
    }

    args[0] = args[0].join(', ');
    options.option.apply(options, args);
  });

  return options;
}

function parseArray(val) {
  return val.split(/,\s*/);
}