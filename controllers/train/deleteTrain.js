const dataBase = require('../../dataBase').getInstance();
dataBase.setModels();

module.exports = async (req, res) => {
    try {
        const Train = dataBase.getModel('Train');

        const ID = req.params.id;
        await Train.destroy({
            where: {
                id: ID
            }
        });

        res.json({
            success: true,
            message: 'train successfully deleted'
        });
    } catch (e) {
        console.log(e);
        res.json({
            success: false,
            message: e.message
        });
    }
};