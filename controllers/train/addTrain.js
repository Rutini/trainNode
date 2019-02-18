const dataBase = require('../../dataBase').getInstance();
dataBase.setModels();

module.exports = async (req, res) => {
    try {
        const Train = dataBase.getModel('Train');

        const trainInfo = req.body;
        const {number, connection, type, count_of_cars, time_of_arrive, time_of_depart, station_id} = trainInfo;
        await Train.create({
            number: number,
            connection: connection,
            type: type,
            count_of_cars: count_of_cars,
            time_of_arrive: time_of_arrive,
            time_of_depart: time_of_depart,
            station_id: station_id
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
