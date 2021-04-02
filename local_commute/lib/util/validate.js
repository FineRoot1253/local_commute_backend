const utils = require('./utils');
const User = require('../../models').user;
const passport = require('passport');

const validator = Object.create(null);

/**
 * [authorization 서버 전용] 엑세스 토큰 검증및 유저DB 조회
 * @param   {Object} tokenInfo - 엑세스 토큰을 디코딩한 토큰 정보
 * @param   {Object} accessToken - 엑세스 토큰 
 * @throws  {Error}  - 에러 발생시 메시지 리턴
 * @returns {Object}
 */
validator.verifyACTK = async (tokenInfo, accessToken) => {
    try{
        utils.verifyTK(accessToken);
    }catch(err){
        console.log('refresh req');
        throw Error('NEED REFRESH');
    }
    const user =  await User.findOne({
        where:{
            email_addr : tokenInfo.email_addr
        }
    });

    return user.dataValues;
}

/**
 * [authorization 서버 전용] 리프레시 토큰 검증
 * @param   {Object} tokenInfo - 리프레시 토큰을 디코딩한 토큰 정보
 * @param   {Object} refreshToken - 리프레시 토큰 
 * @throws  {Error}  - 에러 발생시 메시지 리턴
 * @returns {Object}
 */
 validator.verifyRFTK = (tokenInfo, refreshToken) => {
    try{
        utils.verifyTK(refreshToken);
    }catch(err){
        throw Error('NEED BASIC LOGIN');
    }
    return tokenInfo;
};

/**
 * [authorization 서버 전용] 엑세스 토큰과 리프레시 토큰을 함께 검증
 * @param   {Object} accessToken - 엑세스 토큰
 * @param   {Object} refreshToken - 리프레시 토큰
 * @throws  {Integer}  - 에러 발생시 상태 번호를 반환
 * @returns {Integer}
 */
validator.verifyTKs = async (accessToken, refreshToken) => {
    try{
        utils.verifyTK(accessToken);
    }catch(err){
        return 1;
    }
    try{
        utils.verifyTK(refreshToken);
    }catch(err){
        return 0;
    }

    return 2;
};

/**
 * [resource 서버 전용] resource 서버 모든 엔드포인트 앞에 들어감, 
 *  api 요청의 엑세스 토큰을 검증해 유저의 권한검증ß
 */
 validator.verifyLoggined = [
     passport.authenticate('bearer'),
     (req,res,next) =>{
         console.log(req.header);
         next();
     }
    ]

module.exports = validator;