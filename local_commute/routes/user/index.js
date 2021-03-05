var express = require("express");
const checkUser = require("../../lib/user/checkUser");
const createUser = require("../../lib/user/createUser");
const updateUser = require("../../lib/user/updateUser");
const deleteUser = require("../../lib/user/deleteUser");
const checkUserVaild = require("../../lib/auth/checkUserValid");
var router = express.Router();

router.get('/:userId', checkUser);
//req.params.userId

router.post('/:authId', checkUserVaild, createUser, checkUser);
//req.body

router.put('/:userId', updateUser, checkUser);
//req.params.userId, req.body

router.delete('/:userId', deleteUser);
//req.params.userId

module.exports = router;