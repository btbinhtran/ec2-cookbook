
module.exports = paramsToOptions;
module.exports.cli = cliQuery;

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

function cliQuery(params, attrs, options, query) {
  function parseConstraint(key) {
    return function(val) {
      query.where(key).eq(val);
    }
  }

  function parseAttr(key, data) {
    return function(val) {
      data[key] = val;
    }
  }

  function buildName(param) {
    // XXX: simplify
    var alias = param.aliases && param.aliases[0];

    // define option, e.g. `-u, --user`
    var name = [];
    if (alias) name.push('-' + alias);
    name.push('--' + param.name);

    switch (param.type) {
      case 'boolean':
        break;
      default:
        name.push(' <value>');
        break;
    }

    return name.join(' ');
  }

  // convert params into options, which when parsed
  // get appended to the `query`.

  if (params) {
    params.forEach(function(param){
      var args = [buildName(param), '', parseConstraint(param.name)];
      options.option.apply(options, args);
    });
  }

  if (attrs) {
    // where values will be applied.
    // XXX: maybe could be `model` so it sanitizes.
    var data = {};

    attrs.forEach(function(attr){
      var args = [buildName(attr), '', parseAttr(attr.name, data)];
      options.option.apply(options, args);
    });
  }

  return options;
}