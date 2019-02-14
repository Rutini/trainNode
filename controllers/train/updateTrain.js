const dataBase = require('../../dataBase').getInstance();
dataBase.setModels();

module.exports = async (req, res) => {
    try {
        const Train = dataBase.getModel('Train');

        const ID = req.params.id;
        const trainInfo = req.body;
        await Train.update({
                number: trainInfo.number,
                type: trainInfo.type,
                countOfCars: trainInfo.countOfCars
            }, {
                where: {
                    id: ID
                }
            }
        );

        res.json({
            success: true,
            message: 'train successfully updated'
        });
    } catch (e) {
        console.log(e);
        res.json({
            success: false,
            message: e.message
        });
    }
};
