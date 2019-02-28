const dataBase = require('../../dataBase').getInstance();
dataBase.setModels();

module.exports = async (req, res) => {
    try {
        const Train = dataBase.getModel('Train');

        const id = req.params.id;
        const trainInfo = req.body;
        const token = req.get('Authorization');

        if(!token) throw new Error('No Token');

        const {credentials} = token;

        if (!credentials) throw new Error('You have no credentials to do it');

        const {number, connection, type, count_of_cars, time_of_arrive, time_of_depart, station_id, created_by} = trainInfo;

        if (!number || !connection || !type || !count_of_cars || !time_of_arrive || !time_of_depart || !station_id || !created_by) {
            throw new Error('Some fields are empty');
        }

        await Train.update({
                number,
                connection,
                type,
                count_of_cars,
                time_of_arrive,
                time_of_depart,
                station_id,
                created_by
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
