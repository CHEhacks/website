
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
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.index);
app.get('/users', user.list);
app.get('/gitpull', serverUtils.gitPull.get);
app.post('/gitpull', serverUtils.gitPull.post);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
