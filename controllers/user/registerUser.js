const dataBase = require('../../dataBase').getInstance();
const bcrypt = require('bcrypt');
const {USER} = require('../../config/credentials');

module.exports = async (req, res) => {

    try {
        const User = dataBase.getModel('User');

        const userInfo = req.body;

        if (!userInfo) throw new Error('Body is empty');

        const {name, email, password} = userInfo;

        if (!name || !email || !password) {
            throw new Error('Some fields are empty');
        }

        const alreadyExist = await User.findOne({
            where: {
                email
            }
        });

        if (alreadyExist) throw new Error('This user already exist');

        const credentials = USER;
        const saltRounds = 10;

        bcrypt.hash(password, saltRounds, async (err, hash) => {
            if (err) {
                console.log(err);
            } else await User.create({
                name,
                email,
                password: hash,
                credentials,
                created_at: new Date().toISOString()
            });
        });

        res.json({
            success: true,
            message: 'User successfully registered'
        });
    } catch (e) {
        console.log(e);
        res.json({
            success: false,
            message: e.message
        });
    }
};
