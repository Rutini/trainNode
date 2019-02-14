const dataBase = require('../../dataBase').getInstance();
dataBase.setModels();

module.exports = async (req, res) => {
    try {
        const Train = dataBase.getModel('Train');

        const trainInfo = req.body;
        const {number, type, countOfCars} = trainInfo;
        await Train.create({
            number: number,
            type: type,
            count_of_cars: countOfCars
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
