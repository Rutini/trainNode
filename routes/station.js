const router = require ('express').Router();
const dataBase = require('../dataBase').getInstance();
dataBase.setModels();

const getAllStations = require('../controllers/station/getAllStations');
const getStationByPk = require('../controllers/station/getStationByPk');

router.get('/', getAllStations);

router.get('/:id', getStationByPk);

module.exports = router;
