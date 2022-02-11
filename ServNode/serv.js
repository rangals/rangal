const express = require('express');
const conf = require('./../config.json');
const mysqlx = require('@mysql/xdevapi');

// const Joi = require('joi'); //used for validation
const app = express();
app.use(express.json());
const dbDetails = conf["DB"];


const cors = require('cors');

app.use(cors({
    // origin: '*',
    origin: ['http://localhost:80/','https://www.google.com' ],
    methods: ['GET','POST','DELETE','UPDATE','PUT','PATCH']
}));

const config = {
    password: dbDetails.password,
    user: dbDetails.user,
    host: dbDetails.host,
    port: dbDetails.port,
    schema: dbDetails.schema
};



app.get('/api/login', (req,res)=> {

    mysqlx.getSession(config)
    .then(session => {
        return session.sql(`call SP_getAllUsers("")`)
        .execute()    
    })
    .then((result) => {
        res.send(result.fetchOne());//To fetch all data. fetchOne() to fetch one record at a time
    });
    });
 
//CREATE Request Handler
app.post('/api/login', (req, res)=> {
 
    //const { error } = validateBook(req.body);

    const usr = {
        uname: req.body.uname,
        pwd: req.body.pwd
    };


    mysqlx.getSession(config)
    .then(session => {
        return session.sql(`call SP_getAllUsers("${usr.uname}")`)
        .execute()    
    })
    .then((result) => {
        res.send(result.fetchOne());//To fetch all data. fetchOne() to fetch one record at a time
    });
});
 
 
function validateBook(book) {
// const schema = {
// title: Joi.string().min(3).required()
// };
// return Joi.validator(book, schema);
 return false;
}
 
//PORT ENVIRONMENT VARIABLE
const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`Listening on port ${port}..`));