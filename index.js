// import express module
const express = require('express');

//create an express application
const app = express();

//import files system
const fs = require('fs');

//define the routes and their correspoding functions
app.get('/', (req,res) => {
  fs.stat('./Files/test.txt', (err, stats) => {
    if(err){
      res.send(err)
    }
    else{
      res.json({
        size: stats.size, //size of file
        isFile: stats.isFile(), //is it file
        isDirectory: stats.isDirectory(), //is it folder
        isSymbolicLink: stats.isSymbolicLink() //ist it shorcut

      });
    }
  })
});

//post request
app.post('/create',(req,res) =>{
  fs.writeFile('./Files/newFile.txt','Hello Junga', (err) =>{
    if(err){
      res.send(err);
    }
    else{
      res.send('file created successfully');
    }
  })
})

//to read the contents in a file
app.get('/read',(req,res) => {
  fs.readFile('./Files/test.txt', 'utf8', (err,data) =>{
    if(err){
      res.send(err);
    }
    else{
      res.send(data);
    }
  }) //UTF8 - encoding scheme
});


//to copy file from one file to another using copy file
app.get('/copy', (req,res) => {
  fs.copyFile('./Files/fileA.txt', './Files/fileB.txt', (err) =>{
    if(err){
      res.send(err);
    }
    else{
      res.send('file A copied to B');
    }
  })
})

// read content from one file and paste on another file
app.get('/readPaste', (req,res) =>{
  fs.readFile('./Files/fileC.txt', 'utf8', (err,data) =>{
    if(err){
      res.send(err)
    }
    else{
      fs.writeFile('./Files/fileD.txt', data,(err) =>{
        if(err){
          res.send(err);
        }
        else{
          res.send('File C read and Pasted in file D');
        }
      })
    }
  })
})


//start the server by listening on the port for incoming requests
app.listen(3001,"localhost",()=> {
  console.log("Server is running on http://localhost:3001");
  });