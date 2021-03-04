const UserOutside = require("../../models").outsidework;

const updateUserOutsideData = async (req, res ,next) => {
    let {userId, dest} = req.body;
    let userResult = await UserOutside.findAll({
        attributes:['userId','dest'],
        order:[['osw_Id','desc']],
        limit:1
    });

    if(!userResult){
        res.status(401).end();
        return;
    }
    
    await UserOutside.update({
        dest:dest
    },{where: {userId: userId}});

    next();
}

module.exports = updateUserOutsideData;