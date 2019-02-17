const dataBase = require('../../dataBase').getInstance();
dataBase.setModels();

module.exports = async (req, res) => {
    try {
        const Train = dataBase.getModel('Train');

        const id = req.params.id;
        const trainInfo = req.body;
        const {number, connection, type, count_of_cars, time_of_arrive, time_of_depart} = trainInfo;
        await Train.update({
                number: number,
                connection: connection,
                type: type,
                count_of_cars: count_of_cars,
                time_of_arrive: time_of_arrive,
                time_of_depart: time_of_depart
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
