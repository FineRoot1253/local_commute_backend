const config = require('../../config/config');
const jwt = require('jsonwebtoken');
const utils = require('./utils');
const token = Object.create(null);
const redisClient = require('../../lib/util/redis').redisClient;
const redis = require('../../lib/util/redis').redis;
const validate = require('../../lib/util/validate');

/**
 * [authorization 서버 전용] 리프레시 토큰 생성
 * @param   {Object} email_addr - 토큰 주인 정보, 이메일 주소
 * @returns {Object}
 */
token.generateRTToken = (email_addr) => {
    const resultToken = utils.createToken({ sub: email_addr, exp: config.refreshToken.expiresIn });
    return token.save({ token: resultToken, exp: config.refreshToken.calculateExpirationDate(), email_addr: email_addr, scope: 'RF' }).then(() => resultToken);
};

/**
 * [authorization 서버 전용] 엑세스 토큰 생성
 * @param   {Object} email_addr - 토큰 주인 정보, 이메일 주소
 * @returns {Object}
 */
token.generateACToken = (email_addr) => {
    const resultToken = utils.createToken({ sub: email_addr, exp: config.accessToken.expiresIn });
    return token.save({ token: resultToken, exp: config.accessToken.calculateExpirationDate(), email_addr: email_addr, scope: 'AC' }).then(() => resultToken);
};

/**
 * [authorization 서버 전용] 엑세스 토큰과 리프레시 토큰 생성
 * @param   {Object} email_addr - 토큰 주인 정보, 이메일 주소
 * @returns {Object}
 */
token.generateTokens = (email_addr) => {
    return Promise.all([token.generateACToken(email_addr), token.generateRTToken(email_addr)]);
};

/**
 * [authorization 서버 전용] 토큰DB에 토큰저장
 * @param   {Object} token - 토큰
 * @param   {Object} exp - 토큰 만료일
 * @param   {Object} email_addr - 토큰 주인 정보, 이메일 주소
 * @param   {Object} scope - 토큰의 종류
 * @returns {Object}
 */
token.save = ({ token, exp, email_addr, scope }) => {
    const id = jwt.decode(token).jti;
    redisClient.hmset(id, { 'email_addr': email_addr, 'exp': exp, 'scope': scope }, redis.print);
    console.log(exp);
    redisClient.expireat(id, parseInt(exp.getTime() / 1000));
    return Promise.resolve({ email_addr, exp });
};

/**
 * [authorization 서버 전용] 엑세스 토큰 검증및 유저DB 조회
 * @param   {Object} accessToken - 엑세스 토큰을 디코딩한 토큰 정보
 * @param   {Object} refreshToken - 엑세스 토큰 
 * @returns {Object}
 */
token.revokeTokens = async (accessToken, refreshToken) => {
    let flag = await validate.verifyTKs(accessToken, refreshToken);
    switch (!flag) {
        case 0:
            return false;
        case 1:
            return revokeRFTK(refreshToken);
        case 2:
            break;
    }
    let acKey = jwt.decode(accessToken).jti;
    let rfKey = jwt.decode(refreshToken).jti;
    redisClient.del(acKey);
    redisClient.del(rfKey);
    return true;
};

/**
 * [authorization 서버 전용] 토큰DB에 저장된 리프레시 토큰 삭제
 * @param   {Object} refreshToken - 리프레시 토큰
 * @returns {Boolean}
 */
token.revokeRFTK = (refreshToken) => {
    let rfKey = jwt.decode(refreshToken).jti;
    redisClient.del(rfKey);
    return true;
};

/**
 * [authorization 서버 전용] 토큰 디코딩후 토큰DB 조회
 * @param   {Object} token - 인코딩된 토큰
 * @returns {Object} - 정상처리시 디코딩된 토큰정보 리턴, 실패시 불린 false 리턴
 */
token.findOne = (token) => {
    let decodedToken = jwt.decode(token);
    if (decodedToken === null) {
        throw Error('NEED REFRESH');
    }
    const id = jwt.decode(token).jti;
    return new Promise((resv, rej) => {
        redisClient.hgetall(id, (err, reply) => {
            if (err) {
                rej(err);
            }
            else if (reply === null) {
                rej('Error: NEED BASIC LOGIN');
            } else { resv(reply); }
        });
    });
}

module.exports = token;