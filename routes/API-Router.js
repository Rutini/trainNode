const ApiRouter = require('express').Router();
const trainRouter = require('./train');
const stationRouter = require('./station');

ApiRouter.use('/trains', trainRouter);
ApiRouter.use('/stations', stationRouter);

module.exports = ApiRouter;
