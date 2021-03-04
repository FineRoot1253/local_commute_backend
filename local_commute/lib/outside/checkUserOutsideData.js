const UserOutside = require("../../models").outsidework;

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