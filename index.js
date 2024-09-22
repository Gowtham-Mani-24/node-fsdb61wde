

const app = require('./app');

//import mongoose module
const mongoose = require('mongoose');
//import MONGODB_URI from config.js
const { MONGODB_URI } = require('./utils/config');

//connect to mongodb database
mongoose.connect(MONGODB_URI)
  .then(() => {
    console.log("connected to MongoDb successfully")
    //start the server by listening on the port for incoming requests
    app.listen(3001, () => {
      console.log("Server is running on http://localhost:3001");
    });
  })
  .catch((err) => {
    console.log("error connecting MongoDb database", err)
  });

