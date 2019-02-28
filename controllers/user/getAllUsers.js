const dataBase = require('../../dataBase').getInstance();
dataBase.setModels();

module.exports = async (req, res) => {

    try {
        const User = dataBase.getModel('User');

        const gotUsers = await User.findAll({});

        res.json({
            success: true,
            message: gotUsers
        });
    } catch (e) {
        console.log(e);
        res.json({
            success: false,
            message: e.message
        });
    }
};
