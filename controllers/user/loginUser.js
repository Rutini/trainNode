const dataBase = require('../../dataBase').getInstance();
const tokinazer = require('../../helpers/tokinazer');
const bcrypt = require('bcrypt');

module.exports = async (req, res) => {

    try {
        const User = dataBase.getModel('User');

        const {email, password} = req.body;

        if (!email || !password) throw new Error('Some fields are empty');

        const isPresent = await User.findOne({
            where: {
                email
            }
        });

        if (!isPresent) throw new Error('User with this email does not exist');

        const correctPassword = await new Promise((resolve, reject) => {
            bcrypt.compare(password, isPresent.password, (err, result) => {
                if (err) {
                     console.log(err);
                     return reject(err);
                }
                return resolve(result);
            });
        });


        const {id, credentials} = isPresent.dataValues;
        const {accessToken} = tokinazer(id, credentials);

        if (!correctPassword) {
            res.json({
                success: false,
                message: 'Wrong password'
            });
        } else if (correctPassword) {
            res.json({
                success: true,
                message: accessToken
            });
        }

    } catch (e) {
        console.log(e);
        res.json({
            success: false,
            message: e.message
        });
    }
};
