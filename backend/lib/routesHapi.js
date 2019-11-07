'use strict';

//const sqlite3 = require('sqlite3');

const db = require('./models'); // new require for db object
const db = new sqlite3.Database('pets.db');

module.exports = [
  // We're going to define our routes here
  {
    method: 'GET',
    path: '/',
    handler: (request, h) => {
      return 'All the notes will appear here';
    },
    config: {
      description: 'Gets all the notes available'
    }
  },

  {
    method: 'GET',
    path: '/note/{slug}',
    handler: (request, h) => {
      return 'This is a note';
    },
    config: {
      description: 'Gets the content of a note'
    }
  },




  {
    method: 'GET',
    path: '/react-express-template/master/api/user/fetch/All',
    handler: (request, h) => {
      console.log("From Routes.js");
      // to get name of value from table user_to_pets
      const value = [];
      db.all('SELECT rowid, name, job, pet FROM user_to_pets',

        // callback Function to run when the  query finishes (err,rows)
        (err, rows) => {

          if (rows.length > 0) {
            console.log(" Data from DB \n\n");
            console.log(rows);          
            return h.response(rows);    // to send only one row res.send(rows[0]), for all rows give res.send(rows)

          }
          else {
            return h.response(["Error"]);
          }

        }

      )

      return ' this is from h.response(rows) ';
    },
    config: {
      description: 'Gets the content of a note'
    }
  },



];