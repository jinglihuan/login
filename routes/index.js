var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var user = require('../models/user').user;
mongoose.connect('mongodb://localhost/logintest');   //连接数据库
 
/* GET home page. */
router.get('/', function(req, res) {
      res.render('index', { title: 'index' });
});
 
/*login*/
router.get('/login', function(req, res) {
    res.render('login', { title: 'login' });
});
 
/*logout*/
router.get('/logout', function(req, res) {
      res.render('logout', { title: 'logout' });
});
 
/*hompage*/
router.post('/homepage', function(req, res) {
    var query_doc = {userid: req.body.userid, password: req.body.password};    //对应的数据库中userid  和 password
    (function(){
        user.count(query_doc, function(err, doc){
            if(doc == 1){
                console.log(query_doc.userid + ": login success in " + new Date());
                res.render('homepage', { title: 'homepage' });
            }else{
                console.log(query_doc.userid + ": login failed in " + new Date());
                res.redirect('/error');
            }
        });
    })(query_doc);
});
 
module.exports = router;

//配置路由，也就是请求映射处理