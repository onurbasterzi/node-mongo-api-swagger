const express = require('express');
const router = express.Router();
const User = require('../models/user');


//get users
router.get("/users", (req, res, next) => {
    User.find({}).then((users) => {
        res.send(users);
    }).catch(next);
});

//get distinct users name
router.get("/users/all-robots", (req, res, next) => {
    User.distinct('robotIdList').then(result => {
        res.send(result);
    })
});

//get premium and has robotId matched for coming data
router.get("/users/device-tokens/:robotId", (req, res, next) => {
    User.find({isPremiumUser:true,robotIdList:{$in:[req.params.robotId]}}).then(result => {
        let tokenList=[]
        result.forEach(element => {
            tokenList.push(element.deviceToken)
        })
        res.send(tokenList);
    })
});

//post users
router.post("/users", (req, res, next) => {
    User.create(req.body).then(user => {
        res.send(user);
    }).catch(next)
});

//put request
router.put("/users/:id", (req, res, next) => {
    User.findByIdAndUpdate({ _id: req.params.id }, req.body).then(user => {
        User.findOne({ _id: req.params.id }).then(user => {
            res.send(user);
        })
    }).catch(next)

});

//delete request
router.delete("/users/:id", (req, res, next) => {
    User.findByIdAndRemove({ _id: req.params.id }).then(user => {
        res.send(user);
    }).catch(next)

});


module.exports = router;