const dataBase = require('../../dataBase').getInstance();

module.exports = async (req, res) => {
    try {
        const Station = dataBase.getModel('Station');

        const id = req.params.id;

        if (!id) throw new Error('No id');

        const gotStation = await Station.findByPk(id);

        if (!gotStation) throw new Error('Station with this id does not exist');

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
