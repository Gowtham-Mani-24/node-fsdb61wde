// import express module
const express = require('express');

//create an express application
const app = express();

let companies = [
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

app.get('/companies/search', (req,res) =>{
  const  { id, name, location }  = req.query; //{id} this is descruturing
  // console.log(id);
  let company;

  
  if(id){
    company = companies.find(com => com.id === parseInt(id));
  }
  else if(name){
    company = companies.find (com => com.name.toLowerCase() === name.toLowerCase());
  }
  else if(location){
    company = companies.find (com => com.location.toLowerCase() === location.toLowerCase());
  }
  else if(location && name){
    company = companies.find (com => com.name.toLowerCase() === name.toLowerCase());
    company = companies.find (com => com.location.toLowerCase() === location.toLowerCase());
  }

  if (!company){
    res.json({message:'company not found'});
  }
  else {
    res.json(company);
  }
})

//to use URL parameter
app.get('/companies/:id' ,(req,res) =>{
 // console.log(req.params.id);
 const id = parseInt(req.params.id); //converting to integer value
 const company = companies.find(comp => comp.id === id);
 if(!company){
  res,json({message:'company not found'})
 }
 else{
  res.json(company);
 }
  res.json({message:`Company details by ${req.params.id}`})
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

//updating a company name using put request
app.put('/companies/:id', (req,res) => {
  const id = parseInt(req.params.id);
  const { name }= req.body;
  const company = companies.find(com => com.id ===id);
  company.name = name;
  companies = companies.map(com => com.id === id ? company : com);
  res.json({message:"company updated successfully"});
})

//deleting a company using delete request
app.delete('/companies/:id', (req,res) => {
  const id = parseInt(req.params.id);
  companies = companies.filter(com => com.id !== id);//to filter the remaining companies, so that only given company deleted
  res.json({message:'company deleted successfully'});
})

//start the server by listening on the port for incoming requests
app.listen(3001, ()=> {
  console.log("Server is running on http://localhost:3001");
  });