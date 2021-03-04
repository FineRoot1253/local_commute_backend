const UserOutside = require("../../models").outsidework;

const createUserOutsideData = async (req, res ,next) => {
    let {userId, dest} = req.body;

    const result = await UserOutside.create({
        userId,
        dest
    });


    return res.send(result.dataValues);

}

module.exports = createUserOutsideData;