const dataBase = require('../../dataBase').getInstance();
dataBase.setModels();

module.exports = async (req, res) => {
    try {
        const Train = dataBase.getModel('Train');

        const id = req.params.id;
        const trainInfo = req.body;
        const {number, type, countOfCars} = trainInfo;
        await Train.update({
                number: number,
                type: type,
                count_of_cars: countOfCars
            }, {
                where: {
                    id
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
