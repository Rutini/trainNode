const dataBase = require('../../dataBase').getInstance();
const tokenVerificator = require('../../helpers/tokenVerificator');
const {secret} = require('../../config/secrets');
const {ADMIN} = require('../../config/credentials');

module.exports = async (req, res) => {
    try {
        const User = dataBase.getModel('User');

        const id = req.params.id;

        if (!id) throw new Error('No id');

        const userInfo = req.body;

        if (!userInfo) throw new Error('Body is empty');

        const {name, email, password, credentials} = userInfo;

        if (!name || !email || !password || !credentials) {
            throw new Error('Some field is empty');
        }

        const token = req.get('Authorization');

        if (!token) throw new Error('No Token');

        const {credentials: currentUserCredentials} = tokenVerificator(token, secret);

        if (currentUserCredentials === ADMIN) {

            await User.update({
                    name,
                    email,
                    password,
                    credentials
                }, {
                    where: {
                        id
                    }
                }
            );
        } else throw new Error('You have no credentials to do it');


        res.json({
            success: true,
            message: 'user successfully updated'
        });
    } catch (e) {
        console.log(e);
        res.json({
            success: false,
            message: e.message
        });
    }
};
