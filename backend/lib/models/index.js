'use strict';

//-----------------------------------------------------------
// Database setting  -- 
//------------------------------------------------------------
// ONLY IN CONTROLLER SECTION WHERE WE ARE ACCESS SQL
// THERE ONLY BELOW DB2 CONFIGURAION IS REQUEQUIRED w.r.t sqllite3

require('dotenv').config({ path: '.env' });
const sqlite3 = require('sqlite3');
const db = new sqlite3.Database('pets.db');

module.exports = db;

//########################################### for Postgre/SQlite, we can use this, need to try  not for sqllite3 ######################################
// const Fs = require('fs');
// const Path = require('path');
// const Sequelize = require('sequelize');
// const Settings = require('../../settings');

// // Database settings for the current environment
// const dbSettings = Settings[Settings.env].db;

// console.log(" db setting and setting.env")
// console.log(dbSettings)
// console.log([Settings.env])

// const sequelize = new Sequelize(dbSettings.database, dbSettings.user, dbSettings.password, dbSettings);
// const db = {};

// // Read all the files in this directory and import them as models
// Fs.readdirSync(__dirname)
//   .filter((file) => (file.indexOf('.') !== 0) && (file !== 'index.js'))
//   .forEach((file) => {
//     const model = sequelize.import(Path.join(__dirname, file));
//     db[model.name] = model;
//   });

// db.sequelize = sequelize;
// db.Sequelize = Sequelize;

// module.exports = db;