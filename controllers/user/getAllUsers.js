const dataBase = require('../../dataBase').getInstance();
const tokenVerificator = require('../../helpers/tokenVerificator');
const {secret} = require('../../config/secrets');
const {ADMIN} = require('../../config/credentials');

module.exports = async (req, res) => {

    try {
        const User = dataBase.getModel('User');

        const token = req.get('Authorization');

        if (!token) throw new Error('No token');

        const {credentials} = tokenVerificator(token, secret);

        if (credentials === ADMIN) {
            const gotUsers = await User.findAll({});
            res.json({
                success: true,
                message: gotUsers
            });
        } else throw new Error('You have no credentials to do it');

    } catch (e) {
        console.log(e);
        res.json({
            success: false,
            message: e.message
        });
    }
};
