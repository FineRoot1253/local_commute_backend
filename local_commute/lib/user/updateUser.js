const User = require("../../models").user;

const updateUser = async (req, res ,next) => {
    let {userId,
        userName,
        state,
        onWorkTime,
        offWorkTime} = req.body;

        let finduserResult =  await User.findOne({
            where:{userId: userId}
        });
        if(!finduserResult){
            res.status(401).end();
            return;        
        }

        await User.update({userName, state, onWorkTime, offWorkTime}, {where: {userId: userId}});
        next();

}

module.exports = updateUser;