const OutOfRangeUser = require("../../models").outofrangeuser;

const createOutOfRangeUser = async (req, res ,next) => {
    
    let userId = req.body;

    await OutOfRangeUser.create({userId});
    
    let userResult = await OutOfRangeUser.findAll({
        attributes:['userId'],
        order:[['ooru_Id','desc']],
        limit:1
    });

    if(!userResult){
        res.status(401).end();
        return;
    }

    return res.send(userResult.dataValues);

}

module.exports = createOutOfRangeUser;