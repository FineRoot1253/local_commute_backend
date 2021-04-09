const User = require("../../models").user_full_data;

/**
 * [resource 서버 전용] 유저 데이터 조회
 */
const readUser = async (req, res ,next) => {
    const userId = req.params.userId||req.body.userId;

    const userResult = await User.findOne({
        where : {
            userId : userId
        }
    });
    
    if(!userResult){
        console.log("유저 없음");
        return res.status(401).end();
        
    }
    console.log("유저 잇음", userResult);

    return res.send(userResult.dataValues);
}

const findUser = userId => User.findOne({
    where : {
        userId : userId
    }
});



module.exports = {readUser, findUser};