const dataBase = require('../../dataBase').getInstance();
dataBase.setModels();

module.exports = async (req, res) => {
    try {
        const Train = dataBase.getModel('Train');

        const id = req.params.id;
        const gotTrain = await Train.findByPk(id);

        res.json({
            success: true,
            message: gotTrain
        });
    } catch (e) {
        console.log(e);
        res.json({
            success: false,
            message: e.message
        });
    }
};
