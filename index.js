const express = require('express');
const bodyParse=require('body-parser');
const mongoose=require('mongoose');

//set up express app
const app = express();

//connect to mongodb
mongoose.connect('mongodb://localhost/aryatradedata');
mongoose.Promise=global.Promise;

app.use(bodyParse.json());

//initialize routes
app.use('/api', require('./routes/api'));

//error handling middleware
app.use(function(err, req, res, next){
    //console.log(err);
    res.status(422).send({error: err.message});
});

app.listen(process.env.port || 4000, function () {
    console.log('server started on port 4000');
});
