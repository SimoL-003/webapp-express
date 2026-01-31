import connection from "../database/dbConnection.js";

function index(req, res) {
  const query = "SELECT * FROM movies";

  connection.query(query, (err, results) => {
    if (err) return res.status(500);
    res.json(results);
  });
}

function show(req, res) {
  const { id } = req.params;

  const singleMovie = `
    SELECT *
    FROM movies
    WHERE id = ?
  `;

  connection.query(singleMovie, [id], (err, results) => {
    if (err) return res.status(500);

    if (results.length === 0) {
      res.status(404);
      return res.json({
        error: "NOT FOUND",
        message: "Movie not found",
      });
    }

    res.json(results);
  });
}

export default { index, show };
