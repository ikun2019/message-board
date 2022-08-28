var express = require('express');
var router = express.Router();
var db = require('../models/index');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

// ユーザーの追加
router.get('/add', (req, res, next) => {
  var data = {
    title: 'users/add',
    form: new db.User(),
    err: null
  }
  res.render('users/add', data);
});
router.post('/add', (req, res, next) => {
  const form = {
    name: req.body.name,
    password: req.body.password,
    mail: req.body.mail,
    age: req.body.age,
  };
  db.sequelize.sync()
    .then(() => {
      db.User.create(form)
      .then(usr => {
        res.redirect('/users')
      })
      .catch(err => {
        var data = {
          title: 'users/add',
          form: form,
          err: err,
        }
        res.render('users/add', data);
      });
    })
});

// ログイン
router.get('/login', (req, res, next) => {
  var data = {
    title: 'users/login',
    content: '名前とパスワードを入力してください。'
  }
  res.render('users/login', data);
});
router.post('/login', (req, res, next) => {
  db.User.findOne({
    where: {
      name: req.body.name,
      password: req.body.password,
    }
  }).then((usr) => {
    if(usr != null){
      req.session.login = usr;
      let back = req.session.back;
      if(back == null){
        back = '/';
      }
      res.redirect(back);
    } else {
      var data = {
        title: 'users/login',
        content: '名前かパスワードに問題があります。'
      }
      res.render('users/login', data);
    }
  });
});

module.exports = router;
