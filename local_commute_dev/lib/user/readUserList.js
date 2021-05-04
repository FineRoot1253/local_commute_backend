const User = require("../../models").user;

/**
 * [resource 서버 전용] 유저 데이터 조회
 */
const readUser = async (req, res ,next) => {
    const userId = req.params.userId;

    const userResult = await User.findOne({
        where : {
            userId : userId
        }
    });
    
    if(!userResult){
        res.status(401).end();
        return;
    }
    return res.send(userResult.dataValues);
}

const findUser = userId => User.findOne({
    where : {
        userId : userId
    }
});

module.exports = {readUser, findUser};