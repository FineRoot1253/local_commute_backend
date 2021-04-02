const OutOfRangeUser = require("../../models").outofrangeuser;

const createOutOfRangeUser = async (req, res ,next) => {
    console.log(req.body);
    let userId = req.body.userId;

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