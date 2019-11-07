//######################################################################################################################
//                                                  SERVER.JS 
//###################################################################################################################### 
// This is backend Server having NodeJs and Expressjs using for  ReactJs Application. This component is decoupled
// based on Router and Controllers. we have kept one controller for CRUD Operation and CSV upload  operation.
// Here we have used SQLLite database . to activate the SQLlite for first time. Run the below 2 command to activate and
// create the same Database
//PS C:sss\Users\sramapp\REACTJS\React-express-sql\backend> npm install sqlite3
//PS C:\Users\sramapp\REACTJS\React-express-sql\backend> node create_database.js
//
//import express from 'express';
//-----------------------------------------------------------
// Database setting  -- 
//------------------------------------------------------------
// ONLY IN CONTROLLER SECTION WHERE WE ARE ACCESS SQL
// THERE ONLY BELOW DB2 CONFIGURAION IS REQUEQUIRED
// require('dotenv').config({path:'.env'});
// const sqlite3 = require('sqlite3');
// const db = new sqlite3.Database('pets.db');
//######################################################################################################################

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
app.use(express.json())

const {PythonShell} = require('python-shell');
 
// PythonShell.runString('x=1+1;print(x)', null, function (err) {
//   if (err) throw err;
//   console.log('finished');
// });
//Database setting 
const db = require('./lib/models/index');   //--> need to work on this

// Decoupling the data to Router and Controllers
const routes= require("./lib/routes/routerindex");


// Call the api based on the input passed from the Reactjs/Ui Request
app.use("/test_app/api",routes);
  console.log( "its coming")

  
module.exports = app;

//-------------------------------------------------
app.listen(process.env.PORT || 12099);
console.log("Backend listening at port : 12099");

////################################################################################################################


