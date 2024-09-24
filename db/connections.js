const { Pool } = require('pg');

const pool = new Pool(
    {
      // TODO: Enter PostgreSQL username
      user: 'postgres',
      // TODO: Enter PostgreSQL password
      password: 'password',
      host: 'localhost',
      database: 'jobs_db'
    },
    console.log(`Connected to the jobs_db database.`)
  )

  module.exports = pool;