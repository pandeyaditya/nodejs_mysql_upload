var express = require('express');
var formidable = require('formidable');
var mysql      = require('mysql');
var bodyParser=require("body-parser");
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'root',
  database : 'nodetry'
});
 
connection.connect();
 
global.db = connection;

var app = express();

app.get('/', function (req, res){
    res.sendFile(__dirname + '/index.html');
});

app.post('/', function (req, res){
    var form = new formidable.IncomingForm();

    form.parse(req,function(err, fields, files){
        for(var i =0;i<form.openedFiles.length;i++){
            console.log("I ="+i);
            var property_id = 1;
            var image       = 'testimage';
            var sql = "INSERT INTO `images_tbl`(`property_id`,`property_image`) VALUES ('" + property_id + "','" + image + "')";
    var query = db.query(sql, function(err, result) {
    // //     // res.redirect('/'+result.insertId);
      console.log(result);
      if(err){
        console.log(err);
      }
      });
        }
    });

    form.on('fileBegin', function (name, file){
        file.path = __dirname + '/uploads/' + file.name;
    });

    form.on('file', function (name, file){
        console.log('Uploaded ' + file.name);
    });

    res.sendFile(__dirname + '/index.html');
});

app.listen(3000);