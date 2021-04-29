const User = require("../../models").user;

const updateUser = async (req, res ,next) => {
    console.log("업데이트 전 정보",req.body);
    let {
        userName = req.body.userNm,
        email_addr,
        state
        } = req.body;
        let comp_id = (req.body.comp_id == "UNKNOWN") ? null : req.body.comp_id ;
        let userId = (req.body.userId == "UNKNOWN") ? null : req.body.userId ;
        let user_phone_number = (req.body.phoneNumber == "UNKNOWN") ? null : req.body.phoneNumber;
        let user_telephone_number = (req.body.telephoneNumber == "UNKNOWN") ? null : req.body.telephoneNumber;
        let user_type = req.body.user_type;
        
        console.log(comp_id);
    
        let finduserResult =  await User.findOne({
            where:{email_addr}
        });
        if(!finduserResult){
            console.log("유저 없음");
            res.status(401).end();
            return;        
        }

        console.log(" 업데이트전 레코드 확인 : ",
            user_type,
            userName,
            userId,
            state,
            comp_id,
            user_phone_number,
            user_telephone_number);

        const updateResult = await User.update(
            {
                user_type,
                userName,
                userId,
                state,
                comp_id,
                user_phone_number,
                user_telephone_number
            },
            { where: { email_addr: email_addr },
            returning : true
         });
        console.log("유저 정보 업데이트 결과 : ",updateResult);
        next();

}

const updateUserIamgePath = async (req, res ,next) => {

    console.log("사진 업데이트 전 정보 : ",req.body);

    let email_addr = req.body.email_addr;
    let updateMode = req.body.updateMode;
    let user_profile_photo = req.body.userProfileImagePath;
    let finduserResult = await User.findOne({
            where:{email_addr}
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
            { where: { email_addr },
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