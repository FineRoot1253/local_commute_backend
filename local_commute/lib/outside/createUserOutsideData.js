const UserOutside = require("../../models").outsidework;

/**
 * [resource 서버 전용] 유저 외근 데이터 생성
 */
const createUserOutsideData = async (req, res ,next) => {
    let {userId, dest} = req.body;

    const result = await UserOutside.create({
        userId,
        dest
    });


    return res.send(result.dataValues);

}

module.exports = createUserOutsideData;