const dataBase = require('../../dataBase').getInstance();

module.exports = async (req, res) => {
    try {
        const Station = dataBase.getModel('Station');

        const gotStations = await Station.findAll();

        if (!gotStations) throw new Error('Stations do not exist');

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
