const User = require("../../models").user;
var { nanoid } = require("nanoid");

/**
 * [authorization 서버 전용] 가입 시도시 경로
 * 가입 시도 유저 유효성 검증
 * 성공시 sendEmail로 next, 실패시 401 'ERROR' 리턴
 */
const checkUserValid = async (req, res ,next) => {

req.session.user=req.body;

const email_addr = req.body.email_addr; 
const userId = req.body.userId;

    if(!req.body && !email_addr){
        res.status(401).end();
        req.session.destroy((err)=>{
            console.log(err);
        });
        return res.status(401).send('ERROR');
    }

    const userResult = await User.findOne({
        where : {
            userId : userId
        }
    });

    if(userResult){
        res.status(401).end('ERROR : USER DUPLICATE');
        req.session.destroy((err)=>{
            console.log(err);
        });
        return;
    }
    // otp string set on session
    req.session.otp = nanoid(6);
    req.session.email_addr = email_addr;
    console.log(req.session.otp);
    next();

}



module.exports = checkUserValid;