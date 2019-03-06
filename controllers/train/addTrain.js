const dataBase = require('../../dataBase').getInstance();
const tokenVerificator = require('../../helpers/tokenVerificator');
const {secret} = require('../../config/secrets');

module.exports = async (req, res) => {
    try {
        const Train = dataBase.getModel('Train');

        const trainInfo = req.body;

        if (!trainInfo) throw new Error('Body is empty');

        const token = req.get('Authorization');

        if(!token) throw new Error('No Token');

        const {credentials} = tokenVerificator(token, secret);

        if (!credentials) throw new Error('You have no credentials to do it');

        const {number, connection, type, count_of_cars, time_of_arrive, time_of_depart, station_id, created_by} = trainInfo;

        if (   !number
            || !connection
            || !type
            || !count_of_cars
            || !time_of_arrive
            || !time_of_depart
            || !station_id
            || !created_by) {
            throw new Error('Some fields are empty');
        }

        await Train.create({
            number,
            connection,
            type,
            count_of_cars,
            time_of_arrive,
            time_of_depart,
            station_id,
            created_by
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
