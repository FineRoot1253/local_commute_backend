const User = require("../../model/user_model");

const createUser = async (req, res ,next) => {
    let {
        userId,
        userName,
        state,
        onWorkTime,
        offWorkTime
    } = req.body;

    await User.create({
        userId,
        userName,
        state,
        onWorkTime,
        offWorkTime
    });

    next();

}

module.exports = createUser;