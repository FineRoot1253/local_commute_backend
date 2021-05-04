const UserOutside = require("../../models").outsidework;

/**
 * [resource 서버 전용] 유저 외근 데이터 생성
 */
const createUserOutsideData = async (req, res ,next) => {
    let {user_email_addr, dest} = req.body;

    const result = await UserOutside.create({
        user_email_addr,
        dest
    });


    return res.send(result.dataValues);

}

module.exports = createUserOutsideData;