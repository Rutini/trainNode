const ApiRouter = require('express').Router();
const trainRouter = require('./train');

ApiRouter.use('/trains', trainRouter);

module.exports = ApiRouter;
