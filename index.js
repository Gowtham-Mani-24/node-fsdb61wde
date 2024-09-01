// import express module
const express = require('express');

//create an express application
const app = express();

const companies = [
  {
    id:1,
    name:"Google",
    location:"Mountain View,California",
    email:"careers@google.com",
    phone:"650-253-0000",
    website:"https://careers.google.com",
    createdAt:"2021-09-01T00:00:00Z",
    updatedAt:"2021-09-01T00:00:00Z"
  },
  {
    id:2,
    name:"Facebook",
    location:"Menlo Park, California",
    email:"careers@facebook.com",
    phone:"650-453-0000",
    website:"https://careers.facebook.com",
    createdAt:"2021-09-01T00:00:00Z",
    updatedAt:"2021-09-01T00:00:00Z"
  },
  {
    id:3,
    name:"Amazon",
    location:"Seattle,Washington",
    email:"careers@google.com",
    phone:"950-953-0000",
    website:"https://careers.amazon.com",
    createdAt:"2021-09-01T00:00:00Z",
    updatedAt:"2021-09-01T00:00:00Z"
  }
];

//use the express middleware to parse JSON bodies
app.use(express.json()) ;

app.get('/companies',(req,res) =>{
  res.json(companies);
})

app.post('/companies', (req,res) =>{
  // console.log(req.body);
  const company = req.body;

  company.id = companies[companies.length - 1].id + 1 // to post the new company after at the end
  company.createdAt = new Date().toISOString();
  company.updatedAt = new Date().toISOString();
  companies.push(company);
  res.json({message:"company created successfully"});
})

//start the server by listening on the port for incoming requests
app.listen(3001, ()=> {
  console.log("Server is running on http://localhost:3001");
  });