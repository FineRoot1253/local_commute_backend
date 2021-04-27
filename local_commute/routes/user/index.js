var express = require("express");
const readUser = require("../../lib/user/readUser").readUser;
const readUserCommuteLogList = require('../../lib/user/readUserLogList').readUserCommuteLogList;
const readUserCommuteLogData = require('../../lib/user/readUserLogData');
const createUser = require("../../lib/user/createUser").createUser;
const updateUser = require("../../lib/user/updateUser").updateUser;
const deleteUser = require("../../lib/user/deleteUser").deleteUser;
const checkEmailValid = require("../../lib/auth/checkEmailValid");
const verifyOTP = require("../../lib/auth/verifyOTP");
const sendEmail = require('../../lib/auth/sendEmail');
const createUserCommuteLog = require('../../lib/user/createUserCommuteLog');
const createUserIamge = require('../../lib/user/createUser').createUserImage;
const deleteUserImage = require('../../lib/user/deleteUser').deleteUserImage;
const updateUserImagePath = require("../../lib/user/updateUser").updateUserIamgePath;
const multer = require('multer');

let storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads')
    },
    filename: function (req, file, cb) {
      cb(null, new Date().toISOString()+file.originalname)
    }
  });

  let upload = multer({ storage: storage })

var router = express.Router();

// 유저정보 읽기 ok
router.get('/:email_addr', readUser);
//req.params.userId

// 유저 근태기록리스트 읽기 ok
router.get('/getUserCommuteLogList/:email_addr&:startDate&:endDate', readUserCommuteLogList);
//req.params.userId

// 유저 최신근태기록 읽기 ok
router.get('/getUserCommuteLogData/:email_addr', readUserCommuteLogData);
//req.params.userId

// 유저 생성 요청 ok
router.post('/register', createUser);
//req.body


// 유저 이메일 OTP 인증 요청 ok
router.post('/verifyEmail', checkEmailValid, sendEmail);


/** 유저 이메일 인증 ok
 *  필요 조건 
 *      1) 세션이 유지 되어야함
*/
router.get('/emailOTPverify/:otp', verifyOTP);


// 유저 근태 기록 ok
router.post('/commute', createUserCommuteLog);
 
// 유저정보 업데이트 ok
router.put('/', updateUser, readUser);
//req.params.userId, req.body

// 유저 삭제 확인 보류
router.delete('/:email_addr', deleteUser);
//req.params.userId

// 유저 사진 삭제 확인 보류
router.delete('/image/upload', deleteUserImage, updateUserImagePath);

// 유저 사진 업로드 확인 보류 
router.post('/image/upload', upload.single('img'), createUserIamge, updateUserImagePath);

// 유저 사진 업데이트 확인 보류
router.put('/image/upload', upload.single('img'), createUserIamge, updateUserImagePath, deleteUserImage);


module.exports = router;