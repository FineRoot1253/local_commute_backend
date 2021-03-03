const User = require("../../model/user_model");

const checkUser = async (req, res ,next) => {
    const userId = req.params.userId;

    const userResult = await User.findOne({
        where : {
            userId : userId
        }
    });
    
    if(!userResult){
        res.status(401).end();
        return;
    }

    return res.send(userResult);
}


module.exports = checkUser;