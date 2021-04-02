const User = require("../../models").user;

const updateUser = async (req, res ,next) => {
    console.log(req.body);
    let {userId,
        userName = req.body.userNm,
        email_addr,
        state} = req.body;

        let finduserResult =  await User.findOne({
            where:{userId}
        });
        if(!finduserResult){
            console.log("유저 없음");
            res.status(401).end();
            return;        
        }
        console.log("유저 잇음",userId);
        console.log("유저 잇음",userName);
        console.log("유저 잇음",email_addr);
        console.log("유저 잇음",state);
        // finduserResult.email_addr=email_addr;
        // finduserResult.userName=userName;
        // finduserResult.state=state;
        // await finduserResult.save();
        const updateResult = await User.update(
            {
                userName : userName,
                email_addr : email_addr,
                state : state,
            },
            { where: { userId: userId },
            returning : true
         }
          );
          console.log("유저 정보 업데이트 결과 : ",updateResult);
        next();

}

module.exports = updateUser;