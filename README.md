# perl-express

Add Perl support to your express server.

## Getting Started

### Express 4.x

```
var express = require('express');
var app = express();

// must specify options hash even if no options provided!
var perlExpress = require('perl-express')({

  // assumes perl is in your PATH
  binPath: 'perl'
});

// set view engine to perl-express
app.set('views', './views');
app.engine('cgi', perlExpress.engine);
app.set('view engine', 'cgi');

// routing all .cgi file to perl-express
app.all(/.+\.cgi$/, perlExpress.router);

var server = app.listen(3000, function () {
  var host = server.address().address;
  var port = server.address().port;
  console.log('PerlExpress perl listening at http://%s:%s', host, port);
});

```

### Express 3.x

```
var express = require('express'),
    http = require('http'),
    path = require('path'),

    // require perl-express and config
    perlExpress = require('../')({
        binPath: '/usr/bin/perl' // perl bin path.
    });


// init express
var app = express();
app.set('port', process.env.PORT || 3000);
app.use(express.bodyParser());  // body parser is required!!


// set view engine to perl-express
app.set('views', path.join(__dirname, 'views'));
app.engine('cgi', perlExpress.engine);
app.set('view engine', 'cgi');
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));


// routing all .cgi file to perl-express
app.all(/.+\.cgi$/, perlExpress.router);


http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
```

## Thanks!

* php-express(https://github.com/fnobi/php-express)
