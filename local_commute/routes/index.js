let express = require('express');
let router = express.Router();
let User = require('../dao/model');



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

router.post('/', function(req, res, next) {
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

module.exports = router;
