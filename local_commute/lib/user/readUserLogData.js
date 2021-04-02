const { Op } = require("sequelize");
const Userlogdata = require("../../models").user_worktime_log;

/**
 * [resource 서버 전용] 유저 데이터 조회
 */
const readUserLogData = async (req, res ,next) => {
    const userId = req.params.userId;

    const userlogdata = await Userlogdata.findAll({
        order: [['user_log_idx', 'DESC']],
        limit : 1,
        where : {
                userId: userId,
        }
    });
    if(!userlogdata){
        res.status(401).end();
        return;
    }

    return res.json(userlogdata);
}


module.exports = {readUserLogData};