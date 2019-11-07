// nodejs + Express  server backend
const sqlite3 = require('sqlite3');
const db = new sqlite3.Database('pets.db');

// Run each database statement "Serially" one after Another
// RUN this only once to create the new table. if you wnat to run this .js again then remove the 
// "C:\Users\sramapp\REACTJS\React-express-sql\backend>rm pets.db" before 
// Using " node create_database.js ,
// C:\Users\sramapp\REACTJS\React-express-sql\backend> node create_database.js
//

db.serialize(function() {
    // Create new database
    db.run("CREATE TABLE user_to_pets (name TEXT, job TEXT, pet TEXT)");

    // insert 3 rows in a table:

    db.run("INSERT INTO user_to_pets VALUES ('Philip', 'professor', '45')");
    db.run("INSERT INTO user_to_pets VALUES ('John', 'student', '25')");
    db.run("INSERT INTO user_to_pets VALUES ('Carol', 'engineer', '30')");
    db.run("INSERT INTO user_to_pets VALUES ('Philip', 'professor', '50')");
    db.run("INSERT INTO user_to_pets VALUES ('John', 'student', '15')");
    db.run("INSERT INTO user_to_pets VALUES ('Caran', 'engineer', '39')");
    db.run("INSERT INTO user_to_pets VALUES ('Philiprecod', 'professor', '47')");
    db.run("INSERT INTO user_to_pets VALUES ('Johnpaul', 'student', '20')");
    db.run("INSERT INTO user_to_pets VALUES ('Carol', 'engineer', '31')");

            console.log(" successfully created the users_to_pets table in Pets.db");

    // Print them to confirm the data contains in the database:
    db.each ("SELECT  name, job, pet from user_to_pets", (err,row) => {
           console.log(row.name + ":" + row.job + "-" + row.pet);
});
});

db.close();


