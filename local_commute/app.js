const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const session = require('express-session');
const passport= require('passport');
const bodyParser= require('body-parser');
const flash = require('connect-flash');
const validator = require('./lib/util/validate');
const cors = require('cors');
const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/uploads', express.static(__dirname+'/uploads'));

let compRouter = require('./routes/comp/index');
let userRouter = require('./routes/user/index');
let outsideRouter = require('./routes/outside/index');
let outofrangeRouter = require('./routes/outofrange/index');
let authRouter = require('./routes/auth/index');
let apiRouter = require('./routes/api/index');
let redisClient = require('./lib/util/redis').redisClient;
app.use(cors({origin: true,credentials: true}));
app.use(session({
  secret: '123123newzen',
  resave : false,
  saveUninitialized : false,
  cookie : {
    httpOnly : true,
    maxAge : 3600000
  }
}));
app.use(flash());
redisClient.on('error', function (err) {
  console.log('Error ' + err);
});
app.use(passport.initialize());
app.use(passport.session());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(validator.verifyLoggined);


app.use('/auth',authRouter);
app.use('/api', apiRouter);
app.use('/user', userRouter);
app.use('/outside', outsideRouter);
app.use('/oor', outofrangeRouter);
app.use('/comp', compRouter);

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