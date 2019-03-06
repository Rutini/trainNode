const dataBase = require('../../dataBase').getInstance();
const Sequelize = require('sequelize');

module.exports = async (req, res) => {

    try {
        const Train = dataBase.getModel('Train');

        const id = req.params.id;

        if (!id) throw new Error('No id');

        const gotTrains = await Train.findAll({
            attributes:[
                'id',
                'number',
                'connection',
                'type',
                'count_of_cars',
                [Sequelize.fn('time_format', Sequelize.col('time_of_arrive'), '%H:%i'), 'time_of_arrive'],
                [Sequelize.fn('time_format', Sequelize.col('time_of_depart'), '%H:%i'), 'time_of_depart'],
                'station_id',
                'created_by'
            ],
            where: {
                station_id: id
            }
        });

        if (!gotTrains) throw new Error('Trains from this station do not exist');

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
