const dataBase = require('../../dataBase').getInstance();
const tokinazer = require('../../helpers/tokinazer');
const bcrypt = require('bcrypt');
dataBase.setModels();

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

        bcrypt.compare(password, isPresent.password, (err, res) => {
            if (err) {
                console.log(err);
            }
            if (!res) {
                console.log(password);
                console.log(isPresent.password);
                throw new Error('Wrong password');
            }
        });

        let {id, credentials} = isPresent.dataValues;
        const {accessToken} = tokinazer(id, credentials);

        res.json({
            success: true,
            message: accessToken
        });
    } catch (e) {
        console.log(e);
        res.json({
            success: false,
            message: e.message
        });
    }
};
