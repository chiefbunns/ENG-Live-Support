require('dotenv').config();

const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const designRouter = require('./routes/design');
const loginRouter = require('./routes/login');
const massive = require("massive");
const cors = require('cors');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));



massive(process.env.DATABASE_URL).then(instance => {
  app.use(cors({ origin : 'http://localhost:3000'}));
  app.set('db', instance);
  app.use('/', indexRouter);
  app.use('/users', usersRouter);
  app.use('/design', designRouter);
  app.use('/login', loginRouter);
  // catch 404 and forward to error handler
  app.use(function (req, res, next) {
    next(createError(404));
  });

  // error handler
  app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
  });


  app.listen(3200, function () {
    console.log('Livesupport app listening on port 3200.');
  });

}).catch(err => console.log(err));


module.exports = app;
