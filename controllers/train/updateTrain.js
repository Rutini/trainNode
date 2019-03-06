const dataBase = require('../../dataBase').getInstance();
const tokenVerificator = require('../../helpers/tokenVerificator');
const {secret} = require('../../config/secrets');
const {ADMIN, MODER} = require('../../config/credentials');

module.exports = async (req, res) => {
    try {
        const Train = dataBase.getModel('Train');

        const id = req.params.id;

        if (!id) throw new Error('No id');

        const trainInfo = req.body;

        if (!trainInfo) throw new Error('Body is empty');

        const token = req.get('Authorization');

        if(!token) throw new Error('No Token');

        const {id: currentUserId, credentials} = tokenVerificator(token, secret);

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

        if (credentials === ADMIN || credentials === MODER) {

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
        } else {

            const sameTrain = await Train.findOne({
                where: {
                    id,
                    created_by: currentUserId
                }
            });

            if (!sameTrain) throw new Error('You have no credentials to do it');

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
        }

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
