const dataBase = require('../../dataBase').getInstance();
dataBase.setModels();

module.exports = async (req, res) => {
    try {
        const User = dataBase.getModel('User');

        const id = req.params.id;
        const userInfo = req.body;

        const {name, email, password, credentials} = userInfo;

        if (!name || !email || !password || !credentials) {
            throw new Error('Some field is empty');
        }


        /*
        THIS MUST BE AN ACCESS
        FOR UPDATE USERS
        WHERE UPDATE
        AND CHANGE THEIR CREDENTIALS
        CAN DO ONLY ADMIN
         */

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
