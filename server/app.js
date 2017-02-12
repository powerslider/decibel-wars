// // built-in
// import path from 'path';
// // external
// import bodyParser from 'body-parser';
// import compress from 'compression';
// import cookieParser from 'cookie-parser';
// import express from 'express';
// import mongoose from 'mongoose';
// import favicon from 'serve-favicon';
// local
// import './app/models'; // this MUST be done before controllers
import config from './app/config/config';
// import controllers from './app/controllers';
// import logger from './app/helpers/logger';

import expressConfig from './app/config/express';
import mongooseConfig from './app/config/mongoose';
import passportConfig from './app/config/passport';
import routes from './app/config/routes';

// create app
const app = express();

// Express setup
expressConfig(app, config);

// Mongoose setup
mongooseConfig(config);

// Passport setup
passportConfig();

// Init routes
routes(app);

// // use jade and set views and static directories
// app.set('view engine', 'ejs');
// app.set('views', path.join(config.root, 'app/views'));
// app.use(express.static(path.join(config.root, 'static')));
//
// //add middlewares
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({
//     extended: true
// }));
// app.use(compress());
// app.use(cookieParser());
// app.use(favicon(path.join(config.root, 'static/img/favicon.png')));
//
// // set all controllers
// app.use('/', controllers);
//
// // catch 404 and forward to error handler
// app.use((req, res, next) => {
//     const err = new Error('Not Found');
//     err.status = 404;
//     next(err);
// });
//
// // general errors
// app.use((err, req, res, next) => {
//     const sc = err.status || 500;
//     res.status(sc);
//     res.render('error', {
//         status: sc,
//         message: err.message,
//         stack: config.env === 'development' ? err.stack : ''
//     });
// });

// // MONGOOSE SET-UP
// // warn if MONGOURI is being used and pass is undefined
// if (config.db === process.env.MONGOURI && !config.pass)
//     logger.warn(`bad credientials for ${config.db} -- check env.`);
//
// mongoose.connect(config.db, {
//     user: config.user,
//     pass: config.pass
// });
//
// const db = mongoose.connection;
// db.on('error', () => {
//     throw new Error(`unable to connect to database at ${config.db}`);
// });

// START AND STOP
const server = app.listen(config.port, () => {
    logger.info(`listening on port ${config.port}`);
});

process.on('SIGINT', () => {
    logger.info('shutting down!');
    db.close();
    server.close();
    process.exit();
});


// var express = require('express');
// var path = require('path');
// var favicon = require('serve-favicon');
// var logger = require('morgan');
// var cookieParser = require('cookie-parser');
// var bodyParser = require('body-parser');
//
// var index = require('./routes/index');
// var users = require('./routes/users');
//
// var app = express();
//
// // view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'ejs');
//
// // uncomment after placing your favicon in /public
// //app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
// app.use(logger('dev'));
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public')));
//
// app.use('/', index);
// app.use('/users', users);
//
// // catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   var err = new Error('Not Found');
//   err.status = 404;
//   next(err);
// });
//
// // error handler
// app.use(function(err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get('env') === 'development' ? err : {};
//
//   // render the error page
//   res.status(err.status || 500);
//   res.render('error');
// });
//
// module.exports = app;
