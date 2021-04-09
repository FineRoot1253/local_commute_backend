const User = require("../../models").user;

const updateUser = async (req, res ,next) => {
    console.log("업데이트 전 정보",req.body);
    let {userId,
        userName = req.body.userNm,
        email_addr,
        state
        } = req.body;
        let comp_id = (req.body.comp_id == "UNKNOWN") ? undefined : req.body.comp_id ;
        let user_phone_number = (req.body.phoneNumber == "UNKNOWN") ? undefined : req.body.phoneNumber ;

        console.log(comp_id);
    
        let finduserResult =  await User.findOne({
            where:{userId}
        });
        if(!finduserResult){
            console.log("유저 없음");
            res.status(401).end();
            return;        
        }

        const updateResult = await User.update(
            {
                userName,
                email_addr,
                state,
                comp_id,
                user_phone_number

            },
            { where: { userId: userId },
            returning : true
         });
        console.log("유저 정보 업데이트 결과 : ",updateResult);
        next();

}

const updateUserIamgePath = async (req, res ,next) => {

    console.log("사진 업데이트 전 정보 : ",req.body);

    let userId = req.body.userId;
    let updateMode = req.body.updateMode;
    let user_profile_photo = req.body.userProfileImagePath;
    let finduserResult =  await User.findOne({
            where:{userId}
        });
        if(!finduserResult){
            console.log("유저 없음");
            res.status(401).end();
            return;        
        }
    const updateResult = await User.update(
            {
                user_profile_photo,
            },
            { where: { userId: userId },
            returning : true
         }
          );
          console.log("유저 정보 업데이트 결과 : ",updateResult);

          if(updateMode && finduserResult.user_profile_photo != undefined) {
              req.body.path=finduserResult.user_profile_photo;
              next();
            }
          else return res.sendStatus(200);
}

module.exports = {updateUser, updateUserIamgePath};