//#######################################################################################################
//                                  CRUD OPERATION CONTROLLER COMPONENT
// Database SQLlite3 setting - this is must in the controller where we are using db commands-- 
//#######################################################################################################
// const sqlite3 = require('sqlite3');
// const db = new sqlite3.Database('pets.db');
const db = require('../models/index');


//##################################################  GET  ######################################################
// DisplayBackendData.js (Using React table) / FetchEditDelete.js                           
//##################################################  GET  ######################################################
module.exports.FetchAllData = function (req, res) {
  // to get name of value from table user_to_pets
  console.log(db);
  db.all('SELECT rowid, name, job, pet FROM user_to_pets',

    // callback Function to run when the  query finishes (err,rows)
    (err, rows) => {
      console.log(rows);
      console.log(" from server.js");
      if (rows.length > 0) {
        res.send(rows)    // to send only one row res.send(rows[0]), for all rows give res.send(rows)
        console.log("send rows from server.js");
      }
      else {
        res.send(["Error"]);
        console.log("send Errors from server.js");
      }
    }
  );

};

//##################################################  POST  ######################################################
// AddDetails.js / PostForm.js : POST request  is for posting SELECT DATA FOR EDIT  to the server.
//##################################################  POST  ######################################################

module.exports.InsertUserData = function (req, res) {
  console.log("handling incoming request");
  console.log(req.body);
  console.log(req.body.name);
  // const namelkup  = req.body.name; 
  // const Joblkup  = req.body.job; 
  // const petlkup  = req.body.pet; 

  db.run('INSERT INTO user_to_pets VALUES ($name,$job,$pet)',
    {
      $name: req.body.name,
      $job: req.body.job,
      $pet: req.body.pet
    }, (err) => {

      if (err) {
        res.send({ message: 'Error in app.POST(/user)' });
        console.log(err)
      }
      else {
        res.send({ message: 'Succesfully Inserted the Record (run app.POST(/user))' });
        console.log(`A row has been inserted with rowid`);
      }
    }

  );
  //res.send("Hitting the backend");  // do not send Res.semd 2 times.
  console.log("Hitting the backend");
};


//#############################################################################################################
//   EditDetails.js    
//##############################################################################################################
//--------------------------------------------------------------------------------------------------------------------
//1. GET request:To get Display of the Edit button clicked User Details based on the row, user details from the table
//--------------------------------------------------------------------------------------------------------------------

module.exports.FetchEditUserData = function (req, res) {

  const rowidlkup = req.params.rowid;   // matches the rowid
  console.log(rowidlkup);
  // to get name of value from table user_to_pets
  db.all('SELECT rowid, name, job, pet FROM user_to_pets WHERE rowid=$rowid',
    (
      rowid = req.params.rowid
    ),
    // callback Function to run when the  query finishes (err,rows)
    (err, rows) => {
      console.log(rows);
      if (rows.length > 0) {
        res.send(rows[0])    // to send only one row res.send(rows[0]), for all rows give res.send(rows)
      }
      else {
        res.send([]);
      }
    }
  );

};



//--------------------------------------------------------------------------------------------------------------------
//2. EditDetail.js : POST request  is for posting  update data  of the User into the table.
//--------------------------------------------------------------------------------------------------------------------
module.exports.EditUserData = function (req, res) {
  console.log("handling incoming request");
  console.log(req.body);
  console.log(req.body.name);
  // const namelkup  = req.body.name; 
  // const Joblkup  = req.body.job; 
  // const petlkup  = req.body.pet; 
  // const rowidrowlkup  = req.body.rowid; 

  db.run('UPDATE user_to_pets SET name = $name, job =$job, pet =$pet WHERE rowid = $rowid',
    {
      $name: req.body.name,
      $job: req.body.job,
      $pet: req.body.pet,
      $rowid: req.body.rowid

    }, (err) => {

      if (err) {
        res.send({ message: 'Error in app.POST(/api/user/update/)' });
        console.log(err)
      }
      else {
        res.send({ message: 'Succesfully updated the Record (run app.POST(/user))' });
        console.log(`A row has been UPDATED W.R.T rowid`);
      }
    }

  );
  //res.send("Hitting the backend");  // do not send Res.semd 2 times.
  console.log("Hitting the update SQLbackend");
};

//######################################################################################################
//                               FetchEditDelete.js  / TabletRow.Js  
//######################################################################################################
//  (for Delete operation) : To DELETE the User Details, from the table using Row id
//------------------------------------------------------------------------------------------------------
module.exports.DeleteUserData = function (req, res) {

  const rowidlkup = req.params.rowid;   // matches the rowid
  console.log(rowidlkup);
  // to get name of value from table user_to_pets
  db.all('DELETE FROM user_to_pets WHERE rowid=$rowid',
    (
      rowid = req.params.rowid
    ),
    // callback Function to run when the  query finishes (err)
    (err) => {

      if (err) {
        res.send('Error in app.get(/api/user/delete/)');
        console.log(err)
      }
      else {
        res.send({ message: 'Succesfully Deleted the Record (run app.get(/user/delete))' });
        console.log(`A row has been Deleted W.R.T rowid`);
      }
    }
  );

};