const dataBase = require('../../dataBase').getInstance();
const Sequelize = require('sequelize');
dataBase.setModels();

module.exports = async (req, res) => {

    try {
        const Train = dataBase.getModel('Train');

        const id = req.params.id;
        console.log(id);
        const gotTrains = await Train.findAll({
            attributes:[
                'id',
                'number',
                'connection',
                'type',
                'count_of_cars',
                [Sequelize.fn('time_format', Sequelize.col('time_of_arrive'), '%H:%i'), 'time_of_arrive'],
                [Sequelize.fn('time_format', Sequelize.col('time_of_depart'), '%H:%i'), 'time_of_depart'],
                'station_id'
            ],
            where: {
                station_id: id
            }
        });

        res.json({
            success: true,
            message: gotTrains
        });
    } catch (e) {
        console.log(e);
        res.json({
            success: false,
            message: e.message
        });
    }
};
