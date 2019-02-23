var PerlExpress = function (opts) {
    opts = opts || {};

    this.binPath = opts.binPath || '/usr/bin/perl',
    this.runnerPath = opts.runnerPath || (__dirname + '/../../page_runner.pl');
    this.binOption = opts.binOption || [];

    // default to true for easier perl debugging
    this.displayErrors = typeof opts.displayErrors === 'undefined' ? true : opts.displayErrors;

    this.engine = require('./engine').bind(this);
    this.router = require('./router').bind(this);
};

module.exports = PerlExpress;
