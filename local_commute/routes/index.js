let express = require('express');
let router = express.Router();
let User = require('../dao/user_model');
let OutSideWorkData = require('../dao/outsidework_model');
let OutOfRangeUser = require('../dao/out_of_range_user_model');


/* GET home page. */
router.get('/', function(req, res, next) {
  User.findAll()
  .then((users)=>{
    if(!users) return res.status(404).send({err: 'User Not Found'});
    res.send(users);
  })
  .catch((err) => {
    console.log(err);
    return res.status(500).send(err);
  });
});


router.get('/user/:userId', function(req, res, next) {
  console.log(req.params);
  User.findOneByUserId(req.params.userId)
  .then((user)=>{
    console.log(user);
    if(!user) return res.status(404).send({err: 'User Not Found'});
    res.send(user);
  })
  .catch((err) => {
    console.log(err);
    return res.status(500).send(err);
  });
});


router.get('/outside/:userId', function(req, res, next){

  console.log(req.params);
  OutSideWorkData.findOneByUserId(req.params.userId).then((data)=>{
    console.log(data);
    if(!data) return res.status(404).send({err: 'OutSideWorkData Not Found'});
    res.send(data);
  }).catch((err)=>{
    console.log(data);
    return res.status(500).send(err);
  })
});

router.post('/outside', function(req, res, next) {
  OutSideWorkData.create(req.body)
  .then((user)=>res.sendStatus(200))
  .catch((err) => {
    console.log(err);
    return res.status(500).send(err);
  });
});

router.put('/outside/:userId', function(req, res, next) {
  OutSideWorkData.updateByUserId(req.params.userId, req.body)
  .then((user)=>{
    console.log(user);
    res.send(user);
  })
  .catch(err => res.status(500).send(err));
});





router.post('/user', function(req, res, next) {
  User.create(req.body)
  .then((user)=>res.sendStatus(200))
  .catch((err) => {
    console.log(err);
    return res.status(500).send(err);
  });
});

router.put('/user/:userId', function(req, res, next) {
  User.updateByUserId(req.params.userId, req.body)
  .then((user)=>{
    console.log(user);
    res.send(user);
  })
  .catch(err => res.status(500).send(err));
});

router.delete('/user/:userId', function(req, res, next) {
  User.deleteByUserId(req.params.userId)
  .then((user)=>res.sendStatus(200))
  .catch(err => res.status(500).send(err));
});

router.post('/oor',
function(req, res, next) {
  OutOfRangeUser.create(req.body)
  .then((user)=>{
    console.log(user);
    res.sendStatus(200);
  })
  .catch((err) => {
    console.log(err);
    return res.status(500).send(err);
  });
});

module.exports = router;