const UserOutside = require("../../models").outsidework;

/**
 * [resource 서버 전용] 유저 외근 데이터 업데이트
 */
const updateUserOutsideData = async (req, res ,next) => {
    let {userId, dest} = req.body;
    let userResult = await UserOutside.findAll({
        attributes:['userId','dest'],
        order:[['osw_Id','desc']],
        limit:1
    });

    if(!userResult){
        res.status(401).end();
        return;
    }
    
    await UserOutside.update({
        dest:dest
    },{where: {userId: userId}});

    next();
}

module.exports = updateUserOutsideData;