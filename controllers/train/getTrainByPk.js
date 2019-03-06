const dataBase = require('../../dataBase').getInstance();
const Sequelize = require('sequelize');

module.exports = async (req, res) => {
    try {
        const Train = dataBase.getModel('Train');

        const id = req.params.id;

        if (!id) throw new Error('No id');

        const gotTrain = await Train.findOne({
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
                id
            }
        });

        if (!gotTrain) throw new Error('Train with this id does not exist');

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
