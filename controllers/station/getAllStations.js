const dataBase = require('../../dataBase').getInstance();
dataBase.setModels();

module.exports = async (req, res) => {
    try {
        const Station = dataBase.getModel('Station');

        const gotStations = await Station.findAll();

        res.json({
            success: true,
            message: gotStations
        });
    } catch (e) {
        console.log(e);
        res.json({
            success: false,
            message: e.message
        })
    }

};
