const User = require("../../models").user;
const bcrypt = require('bcrypt');

const createUser = async (req, res ,next) => {

    let {
        userId,
        userName = req.body.userNm,
        userPwd = encrypt(req.body.userPwd),
        email_addr = req.body.emailAddr ,
        state,
        onWorkTime,
        offWorkTime
    } = req.body;

    const result = await User.create({
        userId,
        userName,
        userPwd,
        email_addr,
        state,
        onWorkTime,
        offWorkTime
    });
    return res.send(result.dataValues);
}
function encrypt(text){
    console.log(text);
    return bcrypt.hashSync(text, 10);
}

// const same = bcrypt.compareSync(password, encodedPassword)

module.exports = createUser;