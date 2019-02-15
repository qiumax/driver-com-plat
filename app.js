var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var flash = require('connect-flash');

var app = express();

var config = require('./config/Config')
app.set('config', config);

mongoose.Promise = global.Promise;
mongoose.connect(config.mongodb.url, { useNewUrlParser: true })
.then(() =>  console.log('connection succesful'))
.catch((err) => console.error(err));

var session = require('express-session');
const RedisStore = require('connect-redis')(session);
var redis = require("redis");
var client = redis.createClient(config.redis.port, config.redis.host);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(session({
	store: new RedisStore({
		host: config.redis.host,
		port: config.redis.port,
		pass: config.redis.pwd,
		ttl: config.redis.ttl,
		client: client
	}),
	secret: "sany_driver_plat",
	cookie: { maxAge: 86400*1000 },
	resave: false,
	saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
app.use(express.static(path.join(__dirname, 'public')));

var admin = require('./routes/admin');
var company = require('./routes/company');
var account = require('./routes/account');
var order = require('./routes/order');
var need = require('./routes/need');
var index = require('./routes/index');
var finance = require('./routes/finance');
var publish = require('./routes/publish');

// passport configuration
var Company = require('./models/Company');
passport.use(new LocalStrategy(Company.authenticate()));
passport.serializeUser(Company.serializeUser());
passport.deserializeUser(Company.deserializeUser());

app.use('/api', function (req, res, next) {
    console.log(req.body);
    
    // var error = req.flash('error');
    // var msg = req.flash('msg');
    
	if(req.isAuthenticated()){
		return next();
	}
	else {
		res.redirect('/admin/login');
	}
});

app.use('/admin', admin);
app.use('/api/company', company);
app.use('/api/account', account);
app.use('/api/order', order);
app.use('/api/need', need);
app.use('/api/index', index);
app.use('/api/publish', publish);
app.use('/api/finance', finance);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
	var err = new Error('Not Found');
	err.status = 404;
	next(err);
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
