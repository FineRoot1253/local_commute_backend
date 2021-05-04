const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const session = require('express-session');
const passport= require('passport');
const validator = require('./lib/util/validate'); 
const flash = require('connect-flash'); 
const cors = require('cors');
const app_auth = express();

// view engine setup
app_auth.set('views', path.join(__dirname, 'views'));
app_auth.set('view engine', 'ejs');

app_auth.use(logger('dev'));
app_auth.use(express.json());
app_auth.use(express.urlencoded({ extended: false }));
app_auth.use(cookieParser());
app_auth.use(express.static(path.join(__dirname, 'public')));
app_auth.use(cors({origin: true,credentials: true}));
app_auth.use(flash());
let userRouter = require('./routes/user/index');
let authRouter = require('./routes/auth/index');
let compRouter = require('./routes/comp/index');

app_auth.use(session({
  secret: '123123newzen',
  resave : false,
  saveUninitialized : false,
  cookie : {
    httpOnly : true,
    maxAge : 3600000
  }
}));

app_auth.use(passport.initialize());
app_auth.use(passport.session());
//let ranNum = (+new Date).toString(36);

app_auth.use('/auth',authRouter);
app_auth.use('/user', userRouter);
app_auth.use('/comp', compRouter);

// catch 404 and forward to error handler
app_auth.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app_auth.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app_auth;