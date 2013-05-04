
/**
 * Module dependencies.
 */

var commander = require('commander');

/**
 * Expose `command`.
 */

exports = module.exports = command;

/**
 * Define a command.
 *
 * XXX: tmp refactoring of some stuff.
 */

function command() {
  var options = new commander.Command;
  options
    .option('-k, --key [value]')
    .option('-s, --secret [value]')
    .option('-c, --credentials [value]', 'Path to credentials JSON')
    .option('-f, --format', 'The console output format')
  options.query = exports.query;
  options.attrs = exports.attrs;
  options.params = exports.params;
  return options;
}

exports.query = function(query){
  this._query = query;
  return this;
}

// XXX: this method is a hack for now, need to refactor.
exports.params = function(params){
  var query = this._query
    , self = this;

  function parse(key) {
    return function(val) {
      query.where(key).eq(val);
    }
  }

  // convert params into options, which when parsed
  // get appended to the `query`.

  if (params) {
    params.forEach(function(param){
      var args = [buildName(param), '', parse(param.name)];
      self.option.apply(self, args);
    });
  }

  return this;
}

// XXX: this method is a hack for now, need to refactor.
exports.attrs = function(attrs, action, args){
  var query = this._query
    , self = this
    , data;

  function parse(key) {
    return function(val) {
      data[key] = val;
    }
  }

  if (attrs && action != 'find') {
    // where values will be applied.
    // XXX: maybe could be `model` so it sanitizes.
    data = {};

    attrs.forEach(function(attr){
      var args = [buildName(attr), '', parse(attr.name)];
      self.option.apply(self, args);
    });
  }

  this.parse(args);

  // XXX: move out
  if (data) {
    query.action(action, data)
  } else {
    query.action(action);
  }

  return this;
}

function buildName(param) {
  // XXX: simplify
  var alias = param.aliases && param.aliases[0];

  // define option, e.g. `-u, --user`
  var name = '';
  if (alias) name += '-' + alias + ', ';
  name += '--' + param.name;

  switch (param.type) {
    case 'boolean':
      break;
    default:
      name += ' <value>';
      break;
  }

  return name;
}

// XXX: how?
//if ('function' == typeof options.help)
//  options.help();