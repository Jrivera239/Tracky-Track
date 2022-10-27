const connection = require("./db/connection");
const Organization = require("./utils/index");

connection.connect((err) => {
  if (err) throw err;
  console.log("database connected");
  const database = new Organization();
  database.init();
}
);
