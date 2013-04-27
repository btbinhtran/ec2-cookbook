
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

  if (!options.key && !options.secret) {
    // try to load from databag.
    // recipe.exec('ec2:credentials', 'show', function(data){})
  } else {
    list({ key: options.key, secret: options.secret });
  }

  // XXX: how?
  //if ('function' == typeof options.help)
  //  options.help();

  function list(credentials) {
    var ec2 = require('tower-ec2-adapter')
      , log = options.ui || console.log || table;

    // XXX: make `connect` top-level
    ec2().connect(credentials, function(){
      ec2('instance').find(function(err, instances){
        // XXX: a table printer?
        log(instances);
        fn();
      });
    });
  }
}

/**
 * Create new `instance`.
 */

exports.create = function(recipe, argv){
  var options = require('commander')
    .on('-i, --image [value]')
    .parse(argv);

  var ec2 = require('tower-ec2-adapter');

  var log = options.ui || console.log;

  var attributes = {
    imageId: options.image
  };

  ec2('instances').create(attributes, function(err, instances){
    // XXX: a table printer?
    log(instances);
    fn();
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