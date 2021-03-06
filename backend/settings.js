//########################################### for Postgre/SQlite, we can use this, need to try  not for sqllite3######################################

// This will load our .env file and add the values to process.env,
// IMPORTANT: Omit this line if you don't want to use this functionality

require('dotenv').config({ silent: true });

module.exports = {
  port: process.env.PORT || 3000,
  env: process.env.ENV || 'development',

  // Environment-dependent settings - 
  development: {
    db: {
      dialect: 'sqlite',
      storage: ':memory:'
    }
  },
  production: {
    db: {
      dialect: 'sqlite',
      storage: 'db/database.sqlite'
    }
  }
};