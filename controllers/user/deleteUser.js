const dataBase = require('../../dataBase').getInstance();
dataBase.setModels();

module.exports = async (req, res) => {
    try {
        const User = dataBase.getModel('User');

        const id = req.params.id;
        await User.destroy({
            where: {
                id
            }
        });

        res.json({
            success: true,
            message: 'user successfully deleted'
        });
    } catch (e) {
        console.log(e);
        res.json({
            success: false,
            message: e.message
        });
    }
};
