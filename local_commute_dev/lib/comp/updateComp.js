const { Op } = require("sequelize");
const Comp = require("../../models").comp;

/**
 * [resource 서버 전용] 유저 데이터 조회
 */

const updateComp = async (req, res ,next) => {
    const {
        comp_Id,
        comp_name,
        comp_admin_email_addr,
        comp_state
    } = req.body;


    const comp = await Comp.update({
        comp_Id,
        comp_name,
        comp_admin_email_addr,
        comp_state
    },
    { where: {comp_Id},
    returning : true
 });

    if(!comp){
        res.status(401).end();
        return;
    }

    return res.status(200).end();
}

module.exports = updateComp;