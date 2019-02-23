var path = require('path'),
    util = require('util'),
    querystring = require('querystring'),
    child_process = require('child_process');

var engine = function (filePath, opts, callback) {
    var binPath = this.binPath,
        runnerPath = this.runnerPath,
        displayErrors = this.displayErrors,
        binOption = this.binOption,

        method = opts.method || 'GET',
        get = opts.get || {},
        post = opts.post || {},
        error = typeof opts.error === 'string' ? {stack:opts.error} : (opts.error || {}),

        query = opts.query || querystring.stringify(get),
        body = opts.body || querystring.stringify(post) || error.stack || '',

        env = {
            CONTENT_TYPE: opts.headers['content-type'],
            HTTP_COOKIE: opts.headers['cookie'],
            HTTP_ACCEPT_LANGUAGE: opts.headers['accept-language'],
            HTTP_ACCEPT_ENCODING: opts.headers['accept-encoding'],
            HTTP_ACCEPT: opts.headers['accept'],
            HTTP_REFERER: opts.headers['referer'],
            HTTP_USER_AGENT: opts.headers['user-agent'],
            HTTP_CONNECTION: opts.headers['connection'],
            HTTP_HOST: opts.headers['host'],
            REQUEST_METHOD: method,
            CONTENT_LENGTH: body.length,
            QUERY_STRING: query,
        };

    var perl = child_process.spawn(binPath, [runnerPath, path.dirname(filePath), filePath].concat(binOption), {env:env});
    var buf = '';
    perl.on('error', function(err){
        callback(error);
    })
    perl.on('exit', function(code){
        callback(null, buf);
    })
    perl.stdout.setEncoding('utf-8');
    perl.stdout.on('data', function(data){
        buf += data;
    });
    perl.stderr.setEncoding('utf-8');
    perl.stderr.on('data', function(data){
        console.error(data);
    })
    perl.stdin.setEncoding('utf-8');
    perl.stdin.write(util.format("%s\n", body));
    perl.stdin.end();

};

module.exports = engine;
