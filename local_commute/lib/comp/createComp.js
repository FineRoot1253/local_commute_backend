const { Op } = require("sequelize");
const Comp = require("../../models").comp;

/**
 * [resource 서버 전용] 유저 데이터 조회
 */

const createComp = async (req, res ,next) => {
    const {
        comp_name,
        comp_admin_email_addr
    } = req.body;

    let comp_Id = comp_name + ((+new Date).toString(36).slice(-12));

    const comp = await Comp.create({
        comp_Id,
        comp_name,
        comp_admin_email_addr
    });

    if(!comp){
        res.status(401).end();
        return;
    }

    return res.status(200).end();
}

module.exports = createComp;