  var promise = require('bluebird');

  var options = {
    // Initialization Options
    promiseLib: promise
  };

  var pgp = require('pg-promise')(options);
  //var connectionString = 'postgres://postgres:postgres@localhost:5432/postgres';
  //var db = pgp(connectionString);
  var config = {
            user: 'postgres', //env var: PGUSER
            database: 'postgres', //env var: PGDATABASE
            password: 'postgres', //env var: PGPASSWORD
            host: 'localhost', // Server hosting the postgres database
            schema: 'acipnodeneo',
            port: 5432, //env var: PGPORT
            max: 10, // max number of clients in the pool
            idleTimeoutMillis: 30000, // how long a client is allowed to remain idle before being closed
          };
    var db = pgp(config);

    module.exports = {
        pgp, db
    };
