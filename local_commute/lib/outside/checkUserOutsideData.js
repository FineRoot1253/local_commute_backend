const UserOutside = require("../../models").outsidework;

/**
 * [resource 서버 전용] 유저 외근 데이터 조회
 */
const checkUserOutsideData = async (req, res ,next) => {
    let userId = req.params.userId;

    let userResult = await UserOutside.findAll({
        attributes:['userId','dest'],
        order:[['osw_Id','desc']],
        limit:1
    });

    if(!userResult){
        res.status(401).end();
        return;
    }
    
    return res.send(userResult.dataValues);
}

module.exports = checkUserOutsideData;