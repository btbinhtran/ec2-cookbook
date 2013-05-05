
// XXX: crawl ec2 and create account.
//      prompt for email/pass to existing amazon account.
//      secure.
exports.create;

// XXX: crawl ec2 to find key/secret and store it locally.
exports.fetch;

// XXX: add key/secret to data bag (you have them in hand)
exports.add;

// XXX: set one key as default.
//      $ tower update ec2:account -n main --default
exports.update;

// XXX: remove account from data bag
exports.remove;