const UserOutside = require("../../models").outsidework;

/**
 * [resource 서버 전용] 유저 외근 데이터 조회
 */
const checkUserOutsideData = async (req, res ,next) => {
    let email_addr = req.params.email_addr||req.body.user_email_addr;

    let userResult = await UserOutside.findAll({
        attributes:['user_email_addr','dest'],
        order:[['osw_Id','desc']],
        limit:1,
        where: {user_email_addr: email_addr}
    });

    if(!userResult){
        res.status(401).end();
        return;
    }
    console.log("유저 외근데이터 조회결과",userResult)
    return res.send(userResult);
}

module.exports = checkUserOutsideData;