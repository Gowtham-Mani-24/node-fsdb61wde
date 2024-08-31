// import express module
const express = require('express');

//create an express application
const app = express();

//define th routes and their correspoding functions
app.get('/', (req,res) => {
  res.send("GET World");
});

app.post('/', (req,res) => {
  res.send("POST World");
});

app.get('/test', (req,res) => {
  res.send("GET Test");
});


//start the server by listening on the port for incoming requests
app.listen(3001,"localhost",()=> {
  console.log("Server is running on http://localhost:3001");
});