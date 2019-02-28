const ApiRouter = require('express').Router();
const trainRouter = require('./train');
const stationRouter = require('./station');
const userRouter = require('./user');

ApiRouter.use('/trains', trainRouter);
ApiRouter.use('/stations', stationRouter);
ApiRouter.use('/users', userRouter);

module.exports = ApiRouter;
