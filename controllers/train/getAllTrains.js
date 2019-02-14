const dataBase = require('../../dataBase').getInstance();
dataBase.setModels();

module.exports = async (req, res) => {

    try {
        const Train = dataBase.getModel('Train');
        const gotTrains = await Train.findAll({});

        res.json({
            success: true,
            message: gotTrains
        });
    } catch (e) {
        console.log(e);
        res.json({
            success: false,
            message: e.message
        });
    }
};