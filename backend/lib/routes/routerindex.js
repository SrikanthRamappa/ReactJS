const express = require('express');
const router = express.Router();
// const sqlite3 = require('sqlite3');
// const db = new sqlite3.Database('pets.db');

const ctrCRUD = require("../controllers/CRUD.controller");
const ctrCSV = require("../controllers/CSV.controller");
const ctrPYTHON = require("../controllers/PYTHON.controller");


//######################################################################################################
//  Select All User data: DisplayBackendData.js (Using React table) / FetchEditDelete.js 
//######################################################################################################
   router
    .route("/user/fetch/All")            
    .get(ctrCRUD.FetchAllData);   
    console.log( "ctrCRUD.FetchAllData")
    // navigating to the controller  


//######################################################################################################
// Inserted the User data: AddDetails.js / PostForm.js 
//######################################################################################################
    router
    .route("/post")            
    .post(ctrCRUD.InsertUserData);   
    console.log( "ctrCRUD.InsertUserData")
    // navigating to the controller  


//######################################################################################################
//                                            EditDetails.js    
//######################################################################################################
//--------------------------------------------------------------------------------------------------------------------
//1. GET request:To get Display of the Edit button clicked User Details based on the row, user details from the table
//--------------------------------------------------------------------------------------------------------------------

router
.route("/user/edit/:rowid")            
.get(ctrCRUD.FetchEditUserData);   
console.log( "ctrCRUD.FetchEditUserData")
// navigating to the controller  

//--------------------------------------------------------------------------------------------------------------------
//2. EditDetail.js : POST request  is for posting  update data  of the User into the table.
//--------------------------------------------------------------------------------------------------------------------
router
.route("/user/update/")            
.post(ctrCRUD.EditUserData);   
console.log( "ctrCRUD.EditUserData")
// navigating to the controller 

//######################################################################################################
// for Delete operation:            FetchEditDelete.js  / TabletRow.Js  
//######################################################################################################
//     GET request:      To DELETE the User Details, from the table using Row id
//------------------------------------------------------------------------------------------------------
router
.route("/user/delete/:rowid")            
.get(ctrCRUD.DeleteUserData);   
console.log( "ctrCRUD.DeleteUserData")
// navigating to the controller 

//######################################################################################################
//                        UploadCSv.js  - CSV Upload in location   
//######################################################################################################
// #8 UploadCsv.js    : To UPLOAD THE CSV FILE in the server location folder:  "backend/Uploads"
//------------------------------------------------------------------------------------------------------
// https://programmingwithmosh.com/javascript/react-file-upload-proper-server-side-nodejs-easy/
//

router
.route("/post/Upload")            
.post(ctrCSV.CsvLocationUpload);   
console.log( "ctrCSV.CsvLocationUpload")
// navigating to the controller 

//######################################################################################################
//                         CSV File_Add User.js - Insert the CSV file into Database table 
//######################################################################################################
// #9 FileReader.js   : Read the CSV data in a array called "data", get the "data" from the "data Array"
//------------------------------------------------------------------------------------------------------
router
.route("/post/FileReader")            
.post(ctrCSV.CsvAddUserData);   
console.log( "ctrCSV.CsvAddUserData")

//#######################################################################################################
//                   CSV file list display and select file download
//#######################################################################################################
   
    // READ THE FILE LIST FROM THE FOLDER UploadedFileList.js
    router
    .route("/files")            // when we recive question number after"/" it will call the controller to send the data
    .get(ctrCSV.DisplayFilelist);  
    console.log( "ctrCRUD.DisplayFilelist")     // navigating to the controller 
 
    // Download the selcted file from the folder on desktop
    
    router
    .route("/filesDownload/:filename")            // when we recive question number after"/" it will call the controller to send the data
    .get(ctrCSV.SelectFileDownload);  
    console.log( "ctrCRUD.SelectFileDownload") 

//#####################################################################################################
//                 PYTHON SCRIPT RUNNING
//#####################################################################################################

    router
    .route("/RunPythonScript")            // when we recive question number after"/" it will call the controller to send the data
    .post(ctrPYTHON.RunPythonScript);  
    console.log( "ctrPYTHON.RunPythonScript") 


    // navigating to the controller 
//
module.exports= router;
