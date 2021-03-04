const User = require("../../models").user;

const createUser = async (req, res ,next) => {
    let {
        userId,
        userName = req.body.userNm,
        state,
        onWorkTime,
        offWorkTime
    } = req.body;

    const result = await User.create({
        userId,
        userName,
        state,
        onWorkTime,
        offWorkTime
    });
    return res.send(result.dataValues);
}

module.exports = createUser;