var express = require("express");
const readUser = require("../../lib/user/readUser").readUser;
const readUserLogList = require('../../lib/user/readUserLogList').readUserLogList;
const readUserLogData = require('../../lib/user/readUserLogData').readUserLogData;
const createUser = require("../../lib/user/createUser").createUser;
const updateUser = require("../../lib/user/updateUser").updateUser;
const deleteUser = require("../../lib/user/deleteUser").deleteUser;
const checkUserVaild = require("../../lib/auth/checkUserValid");
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

// 유저정보 읽기
router.get('/:userId', readUser);
//req.params.userId

// 유저 근태기록리스트 읽기
router.get('/getLogList/:userId&:startDate&:endDate', readUserLogList);
//req.params.userId

// 유저 최신근태기록 읽기
router.get('/getUserLogData/:userId', readUserLogData);
//req.params.userId

// 가입 전 유저 체크
router.post('/verify', checkUserVaild, sendEmail);
//req.body

//유저 사진 업로드
router.post('/image/upload', upload.single('img'), createUserIamge, updateUserImagePath);



/** 유저 가입 요청
 *  필요 조건 
 *      1) 가입전 유저 체크로 세션이 유지 되어야함
*/
router.get('/register/:otp', verifyOTP, createUser);

router.post('/commute', createUserCommuteLog);
 
// 유저정보 업데이트
router.put('/', updateUser, readUser);
//req.params.userId, req.body

//유저 사진 업데이트
router.put('/image/upload', upload.single('img'), createUserIamge, updateUserImagePath, deleteUserImage);

////////////////////////////////////////////

//유저 삭제
router.delete('/:userId', deleteUser);
//req.params.userId

//유저 사진 삭제
router.delete('/image/upload', deleteUserImage, updateUserImagePath);

module.exports = router;