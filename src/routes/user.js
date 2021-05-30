const express = require('express');
const User = require('../schema/User.js');
const bcrypt = require('bcryptjs');
const bodyParser = require('body-parser');
const router = express.Router();
const jwt = require('jsonwebtoken');
const config = require('../config/config.js');

router.use(bodyParser.urlencoded({extended:true}));
router.use(bodyParser.json());

//for signin
router.post('/signup',(req,res) => {
    User.findOne({email:req.body.email},(err,result)=>{
        if(err) throw err;
        if(result) return res.send(`user already exists`);
        else{
            const hashpassword = bcrypt.hashSync(req.body.password,8);
            User.create({
                name: req.body.name,
                email: req.body.email,
                password: hashpassword,
                about: req.body.about
            },(err,user) => {
                if(err) throw err;
                res.status(200).send(`user created and details ${user}`);
            })
        }
    })
});

// for login
router.post('/login',(req,res) => {
    User.findOne({email:req.body.email},(err,user) => {
        if(err) return res.status(500).send('Error while login');
        if(!user) return res.send({auth: false, token: 'User not found, Register first'});
        else{
            const isPassValid = bcrypt.compareSync(req.body.password,user.password);
            if(!isPassValid) return res.send({auth: false, token: 'Inavlid Password'});
            const token = jwt.sign({id:user._id},config.secret,{expiresIn:600});
            res.send({auth: true, token: token});
        }
    })
})

// loggedin user info
router.get('/userinfo',(req,res) => {
    const token = req.headers['x-access-token'];
    if(!token) res.send({auth: false, token: 'No token provided'});
    jwt.verify(token,config.secret,(err,user) => {
        if(err) res.send('error while fetching');
        User.findById(user.id,(err,result) => {
            if(err) throw err;
            res.send(result);
        })
    })
})

// to get list of all users
// router.get('/users',(req,res) => {
//     User.find({},(err,user) => {
//         if(err) throw err;
//         res.status(200).send(user)
//     })
// })


module.exports = router;