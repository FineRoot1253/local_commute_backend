const { Op } = require("sequelize");
const Comp = require("../../models").comp;

/**
 * [resource 서버 전용] 유저 데이터 조회
 */
const readCompList = async (req, res ,next) => {
    const comp_name = req.params.comp_name;


    const compList = await Comp.findAll({
        where : {
            comp_name : comp_name
        }
    });
    if(!compList){
        res.status(401).end();
        return;
    }

    return res.json(compList);
}


const readComp = async (req, res ,next) => {
    const comp_Id = req.params.compId;


    const comp = await Comp.findOne({
        where : {
            comp_Id
        }
    });
    if(!comp){
        res.status(401).end();
        return;
    }

    return res.json(comp);
}

module.exports = {readCompList, readComp};