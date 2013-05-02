
/**
 * Find instances
 */

exports.list = function(recipe, argv, fn){
  var options = require('commander')
    .option('-k, --key [value]')
    .option('-s, --secret [value]')
    .option('-c, --credentials [value]', 'Path to credentials JSON')
    .option('-f, --format', 'The console output format')
    .parse(argv);

  connect(options, function(){
    var ec2 = require('tower-ec2-adapter')
      , log = options.ui || console.log || table;

    ec2('instance').find(function(err, instances){
      // XXX: a table printer?
      log(instances);
      fn();
    });
  });

  // XXX: how?
  //if ('function' == typeof options.help)
  //  options.help();
}

/**
 * Create new `instance`.
 *
 * Example:
 *
 *    $ tower create ec2:server --role web-server
 */

exports.create = function(recipe, argv, fn){
  var options = require('commander')
    .option('-i, --image <value>')
    .option('-r, --role [value]')
    .option('-n, --name <value>')
    .parse(argv);

  // ec2('instance').init(options).validate(function(err, instance){
  //   console.log(instance.errors);
  // });
  // action('ec2.instance.create').validate(options, function(err, instance){
  //   console.log(instance.errors);
  // });
  // define short keys on each param/action.
  //    - will be used to automatically generate cli options
  //    - and to compress client/server JSON potentially
  // this means, actually, actions on models, if they have `param`s,
  // are actually sub-models, such as `model('ec2.instance.create')`.
  // if the attributes are simple enough (like when you just build models with tower),
  // you don't need these sub-models b/c they all use the same attributes.
  // be able to validate params on an action (which can be a part of a model).
  // It does this automatically when calling a certain action.
  // It validates against the `params` defined for that action.

  // XXX: how to force require automatically? (command-line validation)
  if (!options.image) throw new Error('Must specify --image');

  connect(options, function(){
    var ec2 = require('tower-ec2-adapter')
      , log = options.ui || console.log || table;

    var attributes = {
        imageId: options.image
      , key: options.name
    };

    ec2('instance').create([attributes], function(err, instances){
      // XXX: a table printer?
      log(instances);
      fn();
    });
  });
}

/**
 * Remove an `instance`.
 */

exports.remove = function(recipe, argv){
  
}

function table(records) {
  var Table = require('cli-table');

  // instantiate
  var table = new Table({
      head: Object.keys(records[0])
  });

  // table is an Array, so you can `push`, `unshift`, `splice` and friends
  records.forEach(function(record){
    var columns = [];
    for (var key in record) columns.push(record[key]);
    table.push(columns);
  })

  console.log(table.toString());
}

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