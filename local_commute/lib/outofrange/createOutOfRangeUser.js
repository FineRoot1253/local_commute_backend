const OutOfRangeUser = require("../../model/out_of_range_user_model");

const createOutOfRangeUser = async (req, res ,next) => {
    
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

    return res.send(userResult);

}

module.exports = createOutOfRangeUser;