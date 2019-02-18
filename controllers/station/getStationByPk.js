const dataBase = require('../../dataBase').getInstance();
dataBase.setModels();

module.exports = async (req, res) => {
    try {
        const Station = dataBase.getModel('Station');

        const id = req.params.id;
        const gotStation = await Station.findByPk(id);

        res.json({
            success: true,
            message: gotStation
        });
    } catch (e) {
        res.json({
            success: false,
            message: e.message
        });
    }
};
