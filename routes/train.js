const router = require('express').Router();

const addTrain = require('../controllers/train/addTrain');
const deleteTrain = require('../controllers/train/deleteTrain');
const getAllTrains = require('../controllers/train/getAllTrains');
const getTrainByPk = require('../controllers/train/getTrainByPk');
const updateTrain = require('../controllers/train/updateTrain');

router.get('/fromStation/:id', getAllTrains);

router.get('/:id', getTrainByPk);

router.post('/', addTrain);

router.put('/:id', updateTrain);

router.delete('/:id', deleteTrain);

module.exports = router;
