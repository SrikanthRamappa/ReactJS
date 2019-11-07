//-----------------------------------------------------------
// Database setting  this is must in the controller where we are using db commands-- 
//------------------------------------------------------------
// ONLY IN CONTROLLER SECTION WHERE WE ARE ACCESS SQL
// THERE ONLY BELOW DB2 CONFIGURAION IS REQUEQUIRED
//// const sqlite3 = require('sqlite3');
// const db = new sqlite3.Database('pets.db');

const db = require('../models/index');

//------------------------------------------------------------------
// File list display and Selected file download
const fs = require('fs');
const path = require('path');


//#######################################################################################################
//   DisplayFilelist - this will display the list of file  whihc you want to download fron the folder
// from the folder:  backend\lib\UploadeFileList
//#######################################################################################################
module.exports.DisplayFilelist = function (req, res) {

  const directoryPath = path.join(__dirname, '../UploadedFileList');
  //passsing directoryPath and callback function
  fs.readdir(directoryPath, function (err, files) {
    //handling error
    if (err) {
      return console.log('Unable to scan directory: ' + err);
    }
        //listing all files using forEach
           files.forEach(function (file) {
               // Do whatever you want to do with the file
            console.log(file); 
            });
      res.contentType("application/csv");
      res.send(files);
  });
};

//  
//#######################################################################################################
// Selectfile download - this will all to download the file whihc you send the file name in the request.
// from the folder:  backend\lib\UploadeFileList 
// localhost:3000/react-express-template/master/api/filesDownload/DACI.csv ( pass the filename in the request)
//#######################################################################################################
module.exports.SelectFileDownload = function (req, res,) {
  var file = req.params.filename;
   
  //var file = 'DACI.csv';
  console.log(file)
  const directoryPath = path.join(__dirname, '../UploadedFileList');
  var fileLocation = path.join(directoryPath, file);
  console.log(fileLocation);
   res.download(fileLocation, file)
};


//######################################################################################################
//                                            CSV Upload in location   
//######################################################################################################
// #8 UploadCsv.js    : To UPLOAD THE CSV FILE in the server location folder:  "backend/Uploads"
//------------------------------------------------------------------------------------------------------
// https://programmingwithmosh.com/javascript/react-file-upload-proper-server-side-nodejs-easy/
//
//----------------------------------------------------------------------------------------------------------------
// Create a multer instance and set the destination folder. The code below uses /public folder. 
// You can also assign a new file name upon upload. The code below uses ‘originalfilename’as the file name.
// 
const formidable = require('formidable')
var multer = require('multer');
var cors = require('cors');
const csvtojsonV2 = require("csvtojson");

var storage = multer.diskStorage
  ({
    destination: function (req, file, cb) {
     // cb(null, 'Uploads')
     cb(null, 'lib/UploadedFileList')
    },

    filename: function (req, file, cb) {
      //cb(null, Date.now() + '-' +file.originalname )    // this will create the file in name "1562336824803-DACI.csv"
      cb(null, file.originalname)
    }
  })

var upload = multer({ storage: storage }).single('file')

//----------------------------------------------------------------------------------------------------------------------

module.exports.CsvLocationUpload = function (req, res) {
  console.log("handling incoming request to load the csv file in the folder uploads");
  //console.log(req);




  // the below Upload will load the csv file into 
  upload(req, res, function (err) {
    if (err instanceof multer.MulterError) {
      return res.status(500).json(err)
    } else if (err) {
      return res.status(500).json(err)
    }
    //return res.status(200).send(req.file)

    console.log(" upload successsful")
    res.send({ message: 'File saved Succesfully in the drive' });
    
    // .then parser file  or async wait  - try this
  })

  //  we need to wait. here either upload will happend or read will happen - else double clik the Upload button

  // console.log(" have the file path")
  // const csvFilePath = 'C:/Users/sramapp/REACTJS/React-express-sql/backend/Uploads/DACI.csv'
  // const csv = require('csvtojson')
  // csv()
  //   .fromFile(csvFilePath)
  //   .then((jsonObj) => {
  //     console.log(jsonObj);

  //     //return res.status(200).send(req.file)
  //    // res.send({ message: 'File saved Succesfully in the drive' });
  //   })

 // //  const jsonArray=  csv().fromFile(csvFilePath);
  ////  console.log(jsonArray)
  ////  return res.status(200).send(req.file)
};

//######################################################################################################
//                                            CSV File_Add User   
//######################################################################################################
// #9 FileReader.js   : Read the CSV data in a array called "data", get the "data" from the "data Array"
//------------------------------------------------------------------------------------------------------

module.exports.CsvAddUserData = function (req, res) {

  console.log("handling incoming fileader request");
  // console.log(req);
  //console.log(req.body[1]);
  console.log(req.body);

  const count = req.body.length;
  console.log(count);

  // for loop count so given i is less than count-1 ,

  for (i = 0; i < count - 1; i++) {
    var namelkup = req.body[i].name;
    var Joblkup = req.body[i].job;
    var petlkup = req.body[i].pet;

    db.run('INSERT INTO user_to_pets VALUES ($name,$job,$pet)',
      {
        $name: namelkup,
        $job: Joblkup,
        $pet: petlkup
      }, (err) => {

        if (err) {
          res.send({ message: 'Error in app.POST(/user)' });
          console.log(err)
        }
        // else {
        //    res.send({message:'Succesfully all record Inserted (run app.POST(/user))'});
        //    console.log(`A row has been inserted with rowid`);
        // }
      }

    );
  }
  //res.send("Hitting the backend");  // do not send Res.semd 2 times.
  console.log("Hitting the backend");
  res.send({ message: 'Succesfully all record Inserted into Database' });
};

//
