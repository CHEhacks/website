(function() {
    var childProcess = require("child_process");
    var oldSpawn = childProcess.spawn;
    function mySpawn() {
        console.log('spawn called');
        console.log(arguments);
        var result = oldSpawn.apply(this, arguments);
        return result;
    }
    childProcess.spawn = mySpawn;
})();

var routes = require('../routes');
var http = require('http');
var path = require('path');
var compass = require('node-compass');
var express = require('express');
var app = express();
exports.app = app;

// all environments
if ('development' == app.get('env')) {
  app.set('port', process.env.DEVPORT || 4000);
} else {
  app.set('port', process.env.PORT || 3000);
}

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '../views'));
app.use(express.logger('dev'));
app.configure(function() {
    app.use(compass({
      project: path.join(__dirname, '../'),
      sass: 'assets/sass',
      css: 'public/css',
      mode: 'compressed'
    }));
});
app.use(express.favicon("../public/images/favicon.png"));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(express.bodyParser());
app.use(app.router);
app.use(express.static(path.join(__dirname, '/../public')));
app.use('/bower_components',  express.static(__dirname + '/../support/bower_components'));

if ('development' == app.get('env')) {
  app.use(express.errorHandler());  
}

app.get('/', routes.home.get);
app.get('/gitpull', routes.gitPull.get);
app.post('/gitpull', routes.gitPull.post);
app.get('/coc', routes.coc.get);
app.get('/mentor', routes.mentor.get);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
