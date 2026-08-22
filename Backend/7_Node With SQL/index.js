import { faker } from '@faker-js/faker';
import mysql from 'mysql2/promise';
import express from 'express';
import path from 'path';
import methodOverride from 'method-override';
import { v4 as uuidv4 } from 'uuid';

const app = express();
app.use(express.urlencoded({extended: true}));
app.use(methodOverride("_method"));
app.set("view engine", "ejs");
app.set("views", path.join( import.meta.dirname, "/views"));
//! If you are on an older version of Node.js (v20.10.0 or older) that doesn't support import.meta.dirname
/*
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
* */


//todo Open a MySQL connection using the promise-based API (compatible with await).
// const connection = await mysql.createConnection({
//   host: 'localhost',
//   user: 'root',
//   database: 'TemporaryData',
//   password: 'MySql@25'
// });

/*
 * todo BEST PRACTICE: Using a Connection Pool instead of a single connection(createConnection).
 * A single connection (createConnection) can bottleneck or crash if multiple users
 * hit the server simultaneously. A Connection Pool (createPool) maintains a batch
 * of connections, automatically distributing them to incoming requests and recycling
 * them when finished. This makes the app highly scalable and robust.
 *
 * Key Pool Configurations:
 * - connectionLimit: The maximum number of simultaneous connections the pool is allowed to create (e.g., 10).
 * - waitForConnections: If true, when all 10 connections are busy, new requests will wait in a queue until one frees up. If false, it throws an error immediately.
 * - queueLimit: The maximum number of requests allowed to wait in that queue. Setting it to 0 means the queue has unlimited limits. if you want 0 limits the set waitForConnection to false.
 *
 * todo Note: createPool does not require the 'await' keyword during setup.
 */
const connection = mysql.createPool({
  host: 'localhost',
  user: 'root',
  database: 'TemporaryData',
  password: 'MySql@25',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});


//todo We have already inserted the data so we have comment some parts And Using routing concept of express to connect with DB data
// Utility function to generate one fake user object for insert/testing.
let getRandomUser = () => {
  // return {
  //   Id: faker.string.uuid(),
  //   username: faker.internet.username(),
  //   email: faker.internet.email(),
  //   password: faker.internet.password(),
  // };
  //! or For bulk generation, values without the key and passing into the DB using Array
  return [
    faker.internet.username(),
    faker.internet.email(),
    faker.internet.password(),
  ];
};

//? Notice that we do not use connection.end() here.
//? This is because 'connection' is shared across all incoming requests.
//? If we close it, later visitors will cause the server to crash.
// HOME ROUTE
app.get('/' , async(req, res) => {
  try {
    let q = `SELECT COUNT(*) AS totalUsers FROM user`;//* We used Alias because MySQL2 package return arrays of objects and each object is equal to a single row,
    //* then, to access that, we need to use the result[0]["count (*)"] with brackets(["..."]), which is quite confusing. We can't use dot notation because parenthesis and asterisk are invalid symbols to JS
    const [results] = await connection.query(q);
    let count = results[0].totalUsers;
    res.render("home.ejs", {totalUsers : count});
  } catch (err) {
    console.log(err);
    res.send("some error in DB");
  }
})

// USER INFORMATION ROUTE
app.get('/user', async (req, res) => {
  try {
    let q = `SELECT id,username,email FROM user`;
    const [results] = await connection.query(q);
    res.render("showuser.ejs", {users : results});
  } catch (err) {
    console.log(err);
    res.send("some error in DB");
  }
})

// EDIT ROUTE
app.get('/user/:id/edit', async (req, res) => {
  let { id } = req.params;

  try {
    let q = `SELECT * FROM user WHERE id='${id}'`; // Note that we need to add quotes because id receive is just a number
    const [results] = await connection.query(q);
    let user = results[0];
    res.render("edit.ejs", { user });
  } catch (err) {
    console.log(err);
    res.send("some error in DB");
  }
})

// UPDATE ROUTE
app.patch("/user/:id", async (req, res) => {
  let { id } = req.params;
  let { username: newUsername , password: formPass} = req.body;

  try {
//! Using placeholders best practices
    let q = `SELECT * FROM user WHERE id = ? `; // Note that we need to add quotes because id receive is just a number

    const [results] = await connection.query(q, [id]);
    let user = results[0];

    if (formPass !== user.password) {
      res.send("Wrong password");
    } else {
      let q2 = `UPDATE user SET username = ? WHERE id = ? `;
      const [ result ] = await connection.query(q2, [newUsername, id]);
      res.redirect('/user');
    }
  } catch (err) {
    console.log(err);
    res.send("Some error in DB");
  }
})

// Add new user
app.get('/user/new', (req, res) => {
  res.render("new.ejs");
});

app.post('/user/new', async(req, res) => {
  let { username , email , password } = req.body;
  const id = uuidv4();
  try {
    let q = `INSERT INTO user (id, username, email, password) VALUES (?, ?, ?, ?)`;
    const [result] = await connection.query(q, [id, username, email, password]);
    console.log("Added new user");
    res.redirect('/user');
  } catch(err) {
    console.log(err);
    res.send("some error in DB")
  }
})

app.get('/user/:id/delete', async(req, res) => {
  let { id } = req.params;
  try {
    let q = `SELECT * FROM user WHERE id = ?`
    const [result] = await connection.query(q, [id]);
    let user = result[0];
    res.render("delete.ejs", { user });
  } catch(err) {
    console.log(err);
    res.send("some error in DB")
  }
})

app.delete('/user/:id', async(req, res) => {
  let { id } = req.params;
  let { password } = req.body;
  try {
    let q = `SELECT * FROM user WHERE id = ?`;
    const [results] = await connection.query(q, [id]);
    let user = results[0];
    if ( user.password !== password ) {
      res.send("wrong password");
    } else {
      let q2 = `DELETE FROM user WHERE id = ?`;
      const [results] = await connection.query(q2, [id]);
      res.redirect('/user');
    }
  } catch(err) {
    console.log(err);
    res.send("some error in DB")
  }
})

app.listen('8080', () => {
  console.log("Server is listening to port 8080...");
})

// Example queries:
// Query to show all tables in the current database.
// let q = 'SHOW TABLES'
//* For single row insertion with placeholders:
// let q = "INSERT INTO user (id, username, email, password) VALUES (?, ?, ?, ?)";
// let user = [1, 'akhtar raza', 'akhtar3@gmail.com', 'password123'];
//* For multiple row insertion:
// let q = "INSERT INTO `user` (username, email, password) VALUES ?";
// let users = [
//   [2, 'akhtar raza0', 'akhtar3@gmail.com0', 'password0'],
//   [3, 'akhtar raza1', 'akhtar3@gmail.com1', 'password1']
// ];
//* for Bulk insertion we run the loop
//todo We have already inserted the data so we have commented this parts And Using routing concept of 'express' and 'uuid'(for new data) packages to connect with DB data

// let data = [];
// for(let i = 1; i <= 100; i++) {
//   data.push(getRandomUser());
// }

// try {
  // For single insertion, you would use:
  // const [results, fields] = await connection.query(q, user);

  // For multiple insertion (bulk insert), pass an array of arrays wrapped in another array:
  // const [results, fields] = await connection.query(q, [data]);

  // Log the results:
  // console.log('Inserted rows:', results.affectedRows);
// } catch (err) {
  // console.log(err);
// }

// Always close the DB connection after finishing with queries.
// connection.end();
