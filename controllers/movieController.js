import connection from "../database/dbConnection.js";

function index(req, res) {
  const query = "SELECT * FROM movies";

  connection.query(query, (err, results) => {
    if (err) return res.status(500);
    res.json(results);
  });
}

export default { index };
