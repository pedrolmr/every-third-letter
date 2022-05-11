const Pool = require("pg").Pool;
const {Client} = require('pg');
require("dotenv").config();

const devConfig = {
  user: process.env.PG_USER,
  password: process.env.PG_PASSWORD,
  host: process.env.PG_HOST,
  database: process.env.PG_DATABASE,
  port: process.env.PG_PORT,
};


const proConfig = {
    connectionString: process.env.DATABASE_URL
};

const pool = new Pool(
    process.env.NODE_ENV === "production" ? proConfig : devConfig,
);

pool.connect((err, client) => {
  if (err) {
    return console.error('Error acquiring client', err.stack)
  }else{
    console.log('Database connected successfully!');
  }
})

// const db_Url = process.env.NODE_ENV === "production" ? proConfig : devConfig;

// const client = new Client({db_Url});

// console.log("db_Url", db_Url)

// global.client = client;

// client.connect()
// .then(connect => console.log('Databse connected successfully!'))
// .catch(err => console.log('Error connecting to database', err))

module.exports = pool;