const User = require("../../models").user;
var { customAlphabet } = require("nanoid");

/**
 * [authorization 서버 전용] 가입 시도시 경로
 * 가입 시도 유저 유효성 검증
 * 성공시 sendEmail로 next, 실패시 401 'ERROR' 리턴
 */
const checkUserValid = async (req, res ,next) => {
    const nanoid = customAlphabet('ABCDEFGHIJKLMNOPQRSTUVWXYZ',6);
    const email_addr = req.body.email_addr; 

    req.session.email_addr = email_addr;


    if(!req.body && !email_addr){
        res.status(401).end();
        req.session.destroy((err)=>{
            console.log(err);
        });
        return res.status(401).send('ERROR');
    }

    const userResult = await User.findOne({
        where : {
            email_addr : email_addr
        }
    });
    console.log("이메일 중복 검증 결과 :",userResult);
    if(userResult){
        res.status(401).end('ERROR : USER DUPLICATE');
        req.session.destroy((err)=>{
            console.log(err);
        });
        return;
    }
    // otp string set on session
    req.session.otp = nanoid();
    req.session.email_addr = email_addr;
    console.log(req.session.otp);
    console.log(req.session.email_addr);
    next();

}



module.exports = checkUserValid;