const router = require('express').Router();

const addTrain = require('../controllers/train/addTrain');
const deleteTrain = require('../controllers/train/deleteTrain');
const getTrainsFromStation = require('../controllers/train/getTrainsFromStation');
const getTrainByPk = require('../controllers/train/getTrainByPk');
const updateTrain = require('../controllers/train/updateTrain');

router.get('/fromStation/:id', getTrainsFromStation);
router.get('/:id', getTrainByPk);
router.post('/', addTrain);
router.put('/:id', updateTrain);
router.delete('/:id', deleteTrain);

module.exports = router;
