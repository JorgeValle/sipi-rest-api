// bring in all needed packages
const bodyParser = require('body-parser'),
      cookieParser = require('cookie-parser'),
      cors = require('cors'),
      express = require('express'),
      fs = require('fs'),
      logger = require('morgan'),
      methodOverride = require('method-override'),
      passport = require('passport'),
      path = require('path'),
      multer = require('multer');

// the entry point for the database connection
require('./models/entry-point.model.js');

// route setup
const authRoutes = require('./routes/auth.routes'),
      retrieveRoutes = require('./routes/retrieve.routes'),
      createRoutes = require('./routes/create.routes'),
      updateRoutes = require('./routes/update.routes'),
      uploadRoutes = require('./routes/upload.routes');

// declare express app
var app = express();

app.listen(process.env.PORT || 4100, function() {
  console.log("Express has started on port 4100, or on Heroku port");
});

// logging middleware
app.use(logger('dev'));

app.set('view engine', 'pug');

// for dev only, allow cors
app.use(cors());

// parsing middleware for json and cookies
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'assets')));

// use method override for allowing put and delete requests on forms
app.use(methodOverride('_method'));

// passport initialize
app.use(passport.initialize());

// setting up the routes for Antares, the Antares admin app, and the optional user app
app.use('/api/auth', authRoutes);
app.use('/api/retrieve', retrieveRoutes);
app.use('/api/create', createRoutes);
app.use('/api/update', updateRoutes);
app.use('/api/upload', uploadRoutes);

// respond with "hello world" when a GET request is made to the homepage
app.get('/', function (req, res) {
  res.send('Sipi Rest API v3.0.0-beta');
})

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers
// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

// finall we export the app module
module.exports = app;