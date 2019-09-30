var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cors = require('cors');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var addNumberRouter = require('./routes/addNumber');
var dellNumberRouter = require('./routes/delNumber');
var updateNumberRouter = require('./routes/updateNumber');
var formsRouter = require('./routes/forms');
var formNumbersRouter = require('./routes/formNumbers');
var addFormNumberRouter = require('./routes/addFormNumber');
var delFormNumberRouter = require('./routes/delFormNumber');
var addCallLogRouter = require('./routes/addCallLog')
var updateCallLogRouter = require('./routes/updateCallLog');
var callLogsRouter = require('./routes/callLogs');
var logsDetailsRouter = require('./routes/logDetails');
var dashboardCardsRouter = require('./routes/dashboardCards');
var graphDataRouter = require('./routes/graph');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/numbers', indexRouter);
app.use('/addnumber', addNumberRouter);
app.use('/delnumber', dellNumberRouter);
app.use('/updatenumber', updateNumberRouter);
app.use('/forms',formsRouter);
app.use('/formnumbers',formNumbersRouter);
app.use('/users', usersRouter);
app.use('/addFormNumber', addFormNumberRouter);
app.use('/delFormNumber', delFormNumberRouter);
app.use('/addcall', addCallLogRouter);
app.use('/updatecall',updateCallLogRouter);
app.use('/logs',callLogsRouter);
app.use('/logdetails', logsDetailsRouter);
app.use('/dashboard', dashboardCardsRouter);
app.use('/graph', graphDataRouter);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
