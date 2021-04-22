const OutOfRangeUser = require("../../models").outofrangeuser;

const createOutOfRangeUser = async (req, res ,next) => {
    console.log(req.body);
    let user_email_addr = req.body.email_addr;

    await OutOfRangeUser.create({user_email_addr});
    
    let userResult = await OutOfRangeUser.findAll({
        attributes:['user_email_addr'],
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