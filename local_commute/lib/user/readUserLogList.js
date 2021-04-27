const { Op } = require("sequelize");
const Userloglist = require("../../models").user_worktime_list;

/**
 * [resource 서버 전용] 유저 데이터 조회
 */
const readUserCommuteLogList = async (req, res ,next) => {
    const user_email_addr = req.params.email_addr;
    const startDate = req.params.startDate;
    const endDate = req.params.endDate;

    const userloglist = await Userloglist.findAll({
        where : {
            user_email_addr,
                [Op.or] : {
                    work_start: {[Op.between] : [Date.parse(startDate), Date.parse(endDate)]},
                    work_end: {[Op.between] : [Date.parse(startDate), Date.parse(endDate)]},
                }
        }
    });
    if(!userloglist){
        res.status(401).end();
        return;
    }

    return res.json(userloglist);
}

const findUser = email_addr => User.findOne({
    where : {
        email_addr
    }
});

module.exports = {readUserCommuteLogList, findUser};