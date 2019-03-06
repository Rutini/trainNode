const dataBase = require('../../dataBase').getInstance();
const tokenVerificator = require('../../helpers/tokenVerificator');
const {secret} = require('../../config/secrets');
const {ADMIN, MODER} = require('../../config/credentials');

module.exports = async (req, res) => {
    try {
        const Train = dataBase.getModel('Train');

        const id = req.params.id;

        if (!id) throw new Error('No id');

        const token = req.get('Authorization');

        if(!token) throw new Error('No Token');

        const {id: currentUserId, credentials} = tokenVerificator(token, secret);

        if (credentials === ADMIN || credentials === MODER) {
            await Train.destroy({
                where: {
                    id
                }
            });
        } else {

            const sameTrain = await Train.findOne({
                where: {
                    id,
                    created_by: currentUserId
                }
            });

            if (!sameTrain) throw new Error('You have no credentials to do it');

            await Train.destroy({
                where: {
                    id
                }
            });
        }

        res.json({
            success: true,
            message: 'train successfully deleted'
        });
    } catch (e) {
        console.log(e);
        res.json({
            success: false,
            message: e.message
        });
    }
};
