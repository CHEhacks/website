
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var user = require('./routes/user');
var serverUtils = require('./routes/serverUtils');
var http = require('http');
var path = require('path');
var sassMiddleware = require('node-sass-middleware');
var compass = require('node-compass');

var dbURL = 'mongodb://localhost/database';
var db = require('mongoose').connect(dbURL);

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(
     sassMiddleware({
        src: __dirname + '/sass',
        dest: __dirname + '/public/stylesheets',
    	debug: true,
    	outputStyle: 'compressed'
    })
);
app.use(
     sassMiddleware({
        src: __dirname + '/sass',
        dest: __dirname + '/public/stylesheets',
    	debug: true,
    	outputStyle: 'compressed'
    })
);
app.configure(function() {
    app.use(compass({
      sass: 'stylesheets/sass',
      css: 'stylesheets/css',
      mode: 'expanded'
    }));
});
app.use(express.favicon("public/images/favicon.png"));
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(express.bodyParser());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));
app.use('/bower_components',  express.static(__dirname + '/bower_components'));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.index);
app.post('/', routes.signup);
app.get('/gitpull', serverUtils.gitPull.get);
app.post('/gitpull', serverUtils.gitPull.post);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
