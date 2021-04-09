const User = require("../../models").user;
const fs = require('fs');


/**
 * [authorization 서버 전용] 유저 삭제
 */
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

/**
 * [resouce 서버 전용] 유저 이미지 삭제
 */
const deleteUserImage = async (req, res ,next) => {

    let path = req.body.path;
    let updateMode = req.body.updateMode;

    console.log(path);

    fs.unlinkSync(path,(err)=>{
        res.status(500).end();
        return ;
    });

    if(updateMode) return res.sendStatus(200);

    next();
}

module.exports = {deleteUser, deleteUserImage};