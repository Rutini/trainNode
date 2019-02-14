const dataBase = require('../../dataBase').getInstance();
dataBase.setModels();

module.exports = async (req, res) => {
    try {
        const Train = dataBase.getModel('Train');

        const trainInfo = req.body;
        await Train.create({
            number: trainInfo.number,
            type: trainInfo.type,
            countOfCars: trainInfo.countOfCars
        });

        res.json({
            success: true,
            message: 'train successfully inserted'
        });
    } catch (e) {
        console.log(e);
        res.json({
            success: false,
            message: e.message
        });
    }
};
