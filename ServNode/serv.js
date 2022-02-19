const express = require('express');
const dat = require('./../DB/data');
// const mysqlx = require('@mysql/xdevapi');

// const Joi = require('joi'); //used for validation
const app = express();
app.use(express.json());

var books = dat["books"];


const cors = require('cors');

app.use(cors({
    // origin: '*',
    //origin: ['http://15.207.210.23','http://172.26.7.55','http://172.26.7.55:80','http://15.207.210.23:80'],
    origin: ['http://localhost:81/' ],
    methods: ['GET','POST','DELETE','UPDATE','PUT','PATCH']
}));

// const config = {
//     password: dbDetails.password,
//     user: dbDetails.user,
//     host: dbDetails.host,
//     port: dbDetails.port,
//     schema: dbDetails.schema
// };


app.get('/api/books', (req,res)=> {
    res.send(books);
    });
     
    //http://localhost:90/api/books/2
    app.get('/api/books/:id', (req, res) => {
    const book = books.find(c => c.id === parseInt(req.params.id));
     
    if (!book) res.status(404).send('<h2 style="font-family: Malgun Gothic; color: darkred;">Ooops... Cant find what you are looking for!</h2>');
    res.send(book);
    });
    
    //{"title": "new byox"}
    //http://localhost:8080/api/books
    app.post('/api/books', (req, res)=> {
     
        const book = books.find(c => c.id === parseInt(req.body.id));
        if (!book) res.send('{"title": "File not found", "id": "Error"}');
        // const book = {
        //     id: books.length + 1,
        //     title: req.body.title
        // };
        // books.push(book);
        res.send(book);
        });
//PORT ENVIRONMENT VARIABLE
const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`Listening on port ${port}..`));