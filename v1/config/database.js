const pg = require("pg");

const { DB_URL } = process.env;

const client = new pg.Client(DB_URL);

client.connect((err) => {
  if (err) {
    throw new Error(err);
  }
  console.log("Database client success");
  initTables();
});

const initTables = () => {
  // create users table if it does not exist
  client.query(
    `CREATE TABLE IF NOT EXISTS users(
        id serial NOT NULL PRIMARY KEY, 
        firstname TEXT NOT NULL, 
        lastname TEXT NOT NULL, 
        email TEXT NOT NULL, 
        password TEXT NOT NULL,
        createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )`,
    (error) => {
      if (error) {
        console.log(error);
      }
    }
  );

  // create transaction table if it does not exist
  client.query(
    `CREATE TABLE IF NOT EXISTS transactions(
        id  serial NOT NULL PRIMARY KEY, 
        amount DECIMAL(10, 2) NOT NULL, 
        type TEXT,
        status TEXT DEFAULT 'pending',
        user_ref INT,
        FOREIGN KEY (user_ref) REFERENCES users(id),
        createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )`,
    (error) => {
      if (error) {
        console.log(error);
      }
    }
  );

  // create balances table
  client.query(
    `CREATE TABLE IF NOT EXISTS balances(
    id serial NOT NULL PRIMARY KEY,
    amount DECIMAL(10, 2) NOT NULL,
    user_ref INT,
    FOREIGN KEY (user_ref) REFERENCES users(id),
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  )`,
    (error) => {
      if (error) console.log(error);
    }
  );
};

module.exports = { conn: client };
