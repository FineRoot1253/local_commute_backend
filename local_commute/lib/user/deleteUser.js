const User = require("../../models").user;

const deleteUser = async (req, res ,next) => {
    let userId = req.params.userId;

    await User.destroy({
        where : {
            userId : userId
        }}).catch((err)=>{
            console.error(err);
        });

    return res.sendStatus(200);
}

module.exports = deleteUser;