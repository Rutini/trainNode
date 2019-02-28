const dataBase = require('../../dataBase').getInstance();
dataBase.setModels();

module.exports = async (req, res) => {
    try {
        const Train = dataBase.getModel('Train');

        const id = req.params.id;
        const token = req.get('Authorization');

        if(!token) throw new Error('No Token');

        const {credentials} = token;

        if (!credentials) throw new Error('You have no credentials to do it');

        await Train.destroy({
            where: {
                id
            }
        });

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
