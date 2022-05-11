const Pool = require("pg").Pool;
require("dotenv").config();

const devConfig = {
  user: process.env.PG_USER,
  password: process.env.PG_PASSWORD,
  host: process.env.PG_HOST,
  database: process.env.PG_DATABASE,
  port: process.env.PG_PORT,
};


const proConfig = {
    connectionString: process.env.DATABASE_URL,
    ssl: {
      rejectUnauthorized: false
    }
};

const pool = new Pool(
    process.env.NODE_ENV === "production" ? proConfig : devConfig,
);

pool.connect((err, client) => {
  if (err) {
    return console.error('Error acquiring client', err.stack)
  }else{
    console.log('Database connected successfully!');
    client.query(`CREATE TABLE IF NOT EXISTS word(
      word_id SERIAL PRIMARY KEY,
      string_to_cut VARCHAR(255),
      return_string VARCHAR(255)
    )`, (err, res) => {
      if (err) throw err;
      console.log('Table created successfully!');
    })
  }
})

module.exports = pool;