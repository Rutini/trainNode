const dataBase = require('../../dataBase').getInstance();
const tokenVerificator = require('../../helpers/tokenVerificator');
const {secret} = require('../../config/secrets');
dataBase.setModels();

module.exports = async (req, res) => {

    try {
        const User = dataBase.getModel('User');

        const token = req.get('Authorization');

        if (!token) throw new Error('No token!');

        const {id} = tokenVerificator(token, secret);
        const isUserRegistered = await User.findByPk(id);

        if(!isUserRegistered) throw new Error('This user does no registered');

        const user = {
            id: isUserRegistered.id,
            name: isUserRegistered.name,
            credentials: isUserRegistered.credentials
        };

        res.json({
            success: true,
            message: user
        });
    } catch (e) {
        console.log(e);
        res.json({
            success: false,
            message: e.message
        });
    }
};
