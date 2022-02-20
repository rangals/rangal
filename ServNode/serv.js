const express = require("express");
var fs = require("fs");
var bcrypt = require("bcryptjs");
const dat = require("./../DB/data");
// const mysqlx = require('@mysql/xdevapi');

// const Joi = require('joi'); //used for validation
const app = express();
app.use(express.json());

var books = dat["books"];
var userFile = "./DB/user.json";

const cors = require("cors");

app.use(
  cors({
     //origin: '*',
    origin: ['http://15.207.210.23','http://172.26.7.55','http://172.26.7.55:80','http://15.207.210.23:80'],
    //origin: ["http://localhost:81/"],
    methods: ["GET", "POST", "DELETE", "UPDATE", "PUT", "PATCH"],
  })
);

// const config = {
//     password: dbDetails.password,
//     user: dbDetails.user,
//     host: dbDetails.host,
//     port: dbDetails.port,
//     schema: dbDetails.schema
// };

app.get("/api/books", (req, res) => {
  res.send(books);
});

//http://localhost:90/api/books/2
app.get("/api/books/:id", (req, res) => {
  const book = books.find((c) => c.id === parseInt(req.params.id));

  if (!book)
    res
      .status(404)
      .send(
        '<h2 style="font-family: Malgun Gothic; color: darkred;">Ooops... Cant find what you are looking for!</h2>'
      );
  res.send(book);
});

//{"title": "new byox"}
//http://localhost:8080/api/books
app.post("/api/user", (req, res) => {
  fs.readFile(userFile, (err, data) => {
    if (err) {
      return console.log(err);
    }
    // let val = data.toString();
    let valjson = JSON.parse(data);
    let usr = valjson["users"].find((c) => c.name === req.body.un);
    //console.log(usr);
    if (!usr) res.send('{"msg": "Incorrect Username/Password", "id": "Error"}');
    var passwordIsValid = bcrypt.compareSync(
      req.body.pwd,
      usr.pwd
    );
    if (!passwordIsValid)
    res.send('{"msg": "Incorrect Username/Password", "id": "Error"}');
    else res.send(`{"msg": "Login Success", "id": ${usr.id}}`);
    // res.send(usr);
  });

  // const book = {
  //     id: books.length + 1,
  //     title: req.body.title
  // };
  // books.push(book);
});
app.post("/api/reguser", (req, res) => {
  fs.readFile(userFile, (err, data) => {
    if (err) {
      return console.log(err);
    }
    // let val = data.toString();
    let valjson = JSON.parse(data);

    let usr = valjson["users"].find((c) => c.name === req.body.un);
    //console.log(usr);
    if (!usr) {
      let lastUser = getMax(valjson["users"], "id");
      let usrid = parseInt(lastUser.id) + 1;

      const newUsr = {
        name: req.body.un,
        id: usrid,
        pwd: bcrypt.hashSync(req.body.pwd, 8),
        email: req.body.email,
        mobile: req.body.phone,
      };

      valjson["users"].push(newUsr);

      fs.writeFile(userFile, JSON.stringify(valjson), (err) => {
        if (err) throw err;
      });

      res.send(`{"msg": "Success", "id": ${newUsr.id}}`);
    } else res.send('{"msg": "User Name already exists!", "id": "Error"}');
  });
});

function getMax(arr, prop) {
  var max;
  for (var i = 0; i < arr.length; i++) {
    if (max == null || parseInt(arr[i][prop]) > parseInt(max[prop]))
      max = arr[i];
  }
  return max;
}
//PORT ENVIRONMENT VARIABLE
const port = process.env.PORT || 80;
app.listen(port, () => console.log(`Listening on port ${port}..`));
