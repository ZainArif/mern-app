const express = require('express');
const router = express.Router();
const Ninja = require('../models/ninja');
const multer = require('multer');




const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads/')
    },
    filename: function (req, file, cb) {
        cb(null, new Date().toISOString().replace(/:/g, '-') + file.originalname)
    },

})


const upload = multer({storage: storage, limits: {
filesize: 1024*1024*5
} });

// router.get('/ninja', function (req, res,next) {

//     console.log(req.query)

//     Ninja.aggregate().near({
//         near: [req.query.lng, req.query.lat],
//         maxDistance: 100000,
//         spherical: true,
//         distanceField: "dist.calculated"
//        }).then(response =>{
//            res.send(response);
//        });
// })


router.get('/ninja', function (req, res, next) {
    Ninja.find({}, function (err, users) {
        var userMap = {};
        users.forEach(function (user) {
            userMap[user._id] = user;
        });
        console.log(userMap);
        res.send(userMap);
    });
    // for single user
    //  Ninja.findById({_id: req.params.id}).then(function(ninja){
    // res.send(ninja)
    //  })

})

router.post('/ninja', upload.single('productimage'), function (req, res, next) {
    // console.log(req.file.filename);
    console.log(req.body);
    
    let ninjaObject = {
        name : req.body.name,
        vote : req.body.vote,
        image :'http://localhost:4000/'+ req.file.filename
    }
    Ninja.create(ninjaObject).then(function (ninja) {
        // console.log(req.body)
        res.send(ninja)
    }).catch(next)

   res.send(ninjaObject);
})


router.put('/ninja/:id', function (req, res, next) {
    Ninja.findByIdAndUpdate({ _id: req.params.id }, req.body).then(function () {
        Ninja.findOne({ _id: req.params.id }).then(function (ninja) {
            res.send(ninja)
        })
    })
})

router.delete('/ninja/:id', function (req, res, next) {
    console.log(req.params.id)
    Ninja.findByIdAndRemove({ _id: req.params.id }).then(function (ninja) {
        res.send(ninja)
    })
})

module.exports = router;


